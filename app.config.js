// import Constants from 'expo-constants';


// const ENV = {
//   dev: {
//     apiUrl: process.env.API_BASE_DEV
//   },
//   staging: {
//     apiUrl: process.env.API_BASE_TEST
//   },
//   prod: {
//     apiUrl: process.env.API_BASE_PROD
//   }
// };

// function getEnvVars(env = "") {
//   if (env === null || env === undefined || env === "") return ENV.dev;
//   if (env.indexOf("dev") !== -1) return ENV.dev;
//   if (env.indexOf("staging") !== -1) return ENV.staging;
//   if (env.indexOf("prod") !== -1) return ENV.prod;
// }

// export default getEnvVars(Constants.manifest.releaseChannel);