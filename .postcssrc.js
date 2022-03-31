module.exports = {
    plugins: {
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        'postcss-pxtorem': {
            // rootValue属性就是告知postcss-pxtorem插件，一个rem是37.5px
            rootValue({ file }) {
                return file.indexOf("vant") !== -1 ? 37.5 : 75
            },
            propList: ['*']
        }
    }
}
