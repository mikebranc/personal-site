module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      "@mui/system/grid": require.resolve("@mui/system/grid")
    }
  }
  return config;
} 