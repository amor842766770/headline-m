import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"
//dayjs默认语言是英语，配置为中文
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')//全局使用

// 定义一个去全局过滤器，就可以任何组件的模板中使用了
// 起始过滤器相当于一个全局可用的方(仅供模板使用)
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式 ：{{表达式 | 过滤器名称 }}
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会熏染到使用过滤器的模板设置

Vue.filter('relativeTime', val => {
    return dayjs().to(dayjs(val))
})

