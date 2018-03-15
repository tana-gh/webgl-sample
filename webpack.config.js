const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.ts'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.css', '.sass', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.sass$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap=true',
                    'sass-loader?indentedSyntax=sass'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './html/index.html'
        })
    ]
}
