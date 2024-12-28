const path = require('path');

module.exports = {
  webpack(config: { resolve: { modules: any[]; }; }) {
    config.resolve.modules.push(path.resolve(__dirname, 'frontend/src'));
    return config;
  },
};


