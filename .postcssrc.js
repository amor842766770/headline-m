module.exports = {
    plugins: {
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        'postcss-pxtorem': {
            // rootValue属性就是告知postcss-pxtorem插件，一个rem是37.5px
            rootValue: 37.5,
            propList: ['*']
        }
    }
}
