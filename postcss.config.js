module.exports = {
  plugins: {
    // "postcss-nested": {},
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },
  },
};
