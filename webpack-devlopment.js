const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env',"@babel/preset-react"],
                    plugins:["@babel/plugin-proposal-object-rest-spread","@babel/plugin-transform-runtime",
                    "babel-plugin-styled-components","@babel/plugin-proposal-class-properties"
                    ]
                  }
                }
            },
            {
                test: /\.less$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader',"less-loader","postcss-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].[hash].css",
          chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title:"classroom",
            filename:'index.html',
            template:'public/index.html'
        })
      ],
}