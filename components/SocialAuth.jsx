import * as Facebook from "expo-facebook";
import { FbAuthCredential, auth, fdb } from "../components/Config";
import AsyncStorage from "@react-native-community/async-storage";
import { create } from "apisauce";

export const fbLogin = async () => {
  try {
    await Facebook.initializeAsync("662635554464619");
    const savedToken = await getToken();
    if (savedToken) {
      const res = FbAuthCredential(savedToken);
      fetchData(savedToken);

      return auth
        .signInWithCredential(res)
        .catch((error) => console.log(error));
    } else {
      const {
        type,
        token,
        expires,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        saveToken({ Token: token, Exp: expires });
        const res = FbAuthCredential(token);
        return auth
          .signInWithCredential(res)
          .catch((error) => console.log(error));
      } else {
        return console.log("invalid token");
      }
    }
  } catch (error) {
    return console.log(error);
  }
};

const getToken = async () => {
  try {
    const res = await AsyncStorage.getItem("@UserToken");
    if (res !== null) {
      const parsed = JSON.parse(res).FacebookToken;
      let time = Date.now() / 1000;
      if (parsed.Exp > time) {
        return parsed.Token;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const saveToken = async (value) => {
  try {
    await AsyncStorage.mergeItem(
      "@UserToken",
      JSON.stringify({ FacebookToken: value })
    );
  } catch (error) {
    console.log(error);
  }
};

const fetchData = async (endPoint) => {
  const graphApi = create({
    baseURL: "https://graph.facebook.com/",
  });
  await graphApi
    .get("me?access_token=" + endPoint)
    .then((res2) => console.log(res2.data));
};
