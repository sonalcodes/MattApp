module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        root: ['.'],
        alias: {
          '@commonComponents': './src/common/components',
          '@commonStyles': './src/common/styles',
          '@components': './src/components',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@src': './src',
          '@auth': './src/screens/auth',
          '@theme': './src/theme',
          '@screens': './src/screens',
          '@redux': './src/redux',
          '@apiCalls': './src/apiCalls',
        },
      },
    ],
  ],
};
