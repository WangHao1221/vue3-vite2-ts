import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import viteCompression from 'vite-plugin-compression';
import ViteComponents from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log("env...",command,mode)
    console.log("process.env...",process.env.NODE_ENV);
    return {
        plugins: [vue(),
        ViteComponents({
            resolvers: [ElementPlusResolver({ importStyle: true })],
        }),
        // gzip压缩 生产环境生成 .gz 文件
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        })
        ],
        resolve: {
            alias: {
                // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
                "@": path.resolve(__dirname, "./src"),
                "@/assets": path.resolve(__dirname, "./src/assets"),
                "@/components": path.resolve(__dirname, "./src/components"),
                "@/views": path.resolve(__dirname, "./src/views"),
                "@/store": path.resolve(__dirname, "./src/store"),
            },
        },
        base: "./",
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/style/main.scss";'
                }
            }
        },
        server: {
            port: 6061,
            https: false, // 是否开启 https
            open: false, // 是否自动在浏览器打开
            host: "0.0.0.0",
            proxy: {
                "/api": {
                    target: "", // 后台接口
                    changeOrigin: true,
                    secure: false, // 如果是https接口，需要配置这个参数
                    // ws: true, //websocket支持
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
        build: {
            //当设置为 true，构建后将会生成 manifest.json 文件
            manifest: false,
            outDir: "dist",
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: mode === 'production',
                    drop_debugger: mode === 'production',
                },
            },
            rollupOptions: {
                output: {
                    // https://rollupjs.org/guide/en/#outputmanualchunks
                    manualChunks: {
                        vlib: ['vue', 'vue-router', 'vuex']
                    }
                }
            },
            //生成静态资源的存放路径
            assetsDir: "assets",
            //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
            assetsInlineLimit: 4096,
            //启用/禁用 CSS 代码拆分
            cssCodeSplit: true,
            //构建后是否生成 source map 文件
            sourcemap: false,
            //@rollup/plugin-commonjs 插件的选项
            commonjsOptions: {

            },
        },
    }
})
