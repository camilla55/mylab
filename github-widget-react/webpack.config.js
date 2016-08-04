var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/app.jsx",
    output: {
        path: __dirname,
        filename: "widget.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: ['babel'],
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
};