export default {
    install(Vue, options) {
        Vue.prototype.$nodeEnv = process.env.NODE_ENV
    }
}