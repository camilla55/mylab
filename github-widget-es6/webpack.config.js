module.exports = {
    entry: "./src/widget.js",
    output: {
        path: __dirname,
        filename: "widget.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel']
        }]
    },
};