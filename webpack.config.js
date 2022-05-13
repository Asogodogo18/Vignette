const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.resolve.alias["../../Utilities/Platform"] =
    "react-native-web/dist/exports/Platform";
  config.resolve.alias["../Utilities/Platform"] =
    "react-native-web/dist/exports/Platform";
  config.resolve.alias["./Platform"] = "react-native-web/dist/exports/Platform";
  config.resolve.alias["./PlatformColorValueTypes"] =
    "react-native-web/dist/exports/StyleSheet";

  return config;
};
