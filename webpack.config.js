module.exports = {
    module: {
        rules: [{
            test: /.(css|scss)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer'),
                            require('postcss-pxtorem')({
                                rootValue: 192, // 基于1920px宽的设计图
                                propList: ['*']
                            })
                        ]
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }]
    }
};