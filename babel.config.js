module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      // 'module:react-native-dotenv'
    ],
    // "plugins": [["inline-dotenv",{
    //   path: './.env' // See motdotla/dotenv for more options
    // }]]
  };
};
