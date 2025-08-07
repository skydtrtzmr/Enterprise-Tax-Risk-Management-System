// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    experimental: {
        appManifest: false,
    },
    // 配置此项以规避报错：
    // Error matching route rules. TypeError: Cannot read properties of undefined (reading 'entries')
    // 参考：https://github.com/nuxt-modules/ionic/issues/591

    ssr: false,

    app: {
        baseURL: "./",
        buildAssetsDir: "assets",
    },
    // css: ["/assets/main.css"],


    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    modules: ["@element-plus/nuxt"],
    elementPlus: {},
    vite: {
        optimizeDeps: {
            include: ["dayjs"],
        },
    },
    build: {
        transpile: ["element-plus"],
    },
});
