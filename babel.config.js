module.exports = {
  presets: ['@babel/env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'styled-components',
      {
        displayName: process.env.NODE_ENV !== 'production',
        fileName: false,
        ssr: false,
      },
    ],
  ],
};
