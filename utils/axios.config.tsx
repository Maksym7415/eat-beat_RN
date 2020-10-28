import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const LocalStorageService = (() => {
  let _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken({ accessToken, refreshToken }) {
    AsyncStorage.setItem("accessToken", accessToken);
    AsyncStorage.setItem("refreshToken", refreshToken);
  }
  async function _getAccessToken() {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  }
  async function _getRefreshToken() {
    const token = await AsyncStorage.getItem("refreshToken");
    return token;
  }
  function _clearToken() {
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("refreshToken");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();

const setAxios = () => {
  const setDeafults = (() => {
    // host for remote connection
    axios.defaults.baseURL =
      "https://logisticbrocker.hopto.org/eat-beat-test/api";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common.accept = "application/json";
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios.defaults.timeout = 10000;
  })();

  const localStorageService = LocalStorageService.getService();

  axios.interceptors.request.use(
    async (config) => {
      console.log(config)
      const token = await localStorageService.getAccessToken();
      if (token) {
        if (config.url === "/refresh-token") return config;
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  axios.interceptors.response.use(
    (response) => {
      const { url } = response.config;
      if (url === "/auth/sign-in") {
        const { accessToken, refreshToken } = response.data;
        LocalStorageService.setToken({ accessToken, refreshToken });
      }
      return response;
    },
    async (error) => {
      console.log(error)
      const originalRequest = error.config;

      if (error.response.status === 401) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }
        isRefreshing = true;
        const refreshToken = await localStorageService.getRefreshToken();
        return new Promise(async (resolve, reject) => {
          try {
            const payload = await axios.post("/refresh-token", {
              refreshToken,
            });
            if (payload.status === 200) {
              localStorageService.setToken({
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
              });
              axios.defaults.headers.common.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
              processQueue(null, payload.accessToken);
              resolve(axios(originalRequest));
            }
          } catch (err) {
            processQueue(err, null);
            reject(err);
          }
          isRefreshing = false;
        });
      }
      return Promise.reject(error);
    }
  );
};

export default setAxios;
