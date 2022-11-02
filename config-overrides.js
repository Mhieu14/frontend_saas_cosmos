const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        fs: require.resolve('fs'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        })
    );

    return config;
};
