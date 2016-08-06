module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "widget.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "css-loader"
        }, {
            test: /\.html$/,
            loader: "html"
        }]
    },
};