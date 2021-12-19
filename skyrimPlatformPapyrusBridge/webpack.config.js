//webpack.config.js
const path = require('path');
const fs = require('fs')
const buildFolder = './build'
const folderName = path.basename(__dirname)

//////////////////////////////////
// Configure this for each plugin
const filename = `${folderName}.js`
//////////////////////////////////

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, buildFolder),
        filename
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    externals: {
        "skyrimPlatform": "skyrimPlatform"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
};