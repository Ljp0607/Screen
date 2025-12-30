import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// 代理配置
const domain = {
  dev: "https://zz-test05.pinming.org/",
  zzpre: "https://zzpre.pinming.org/",
  master: "https://zhuang.pinming.cn/",
  test02: "https://zz-test02.pinming.org/",
  test03: "https://zz-test03.pinming.org/",
};

const proxyUrl = domain["master"];

const proxyConfig = {
  "/local-test/": {
    target: "http://41a9f5b7.r6.cpolar.cn",
    changeOrigin: true,
    pathRewrite: { "^/local-test": "" },
  },
  "/api-gateway/": {
    target: proxyUrl,
    changeOrigin: true,
  },
  "/api-gateway/login": {
    target: proxyUrl,
    changeOrigin: true,
  },
  "/api-gateway/project": {
    target: proxyUrl,
    changeOrigin: true,
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  server: {
    proxy: proxyConfig,
    host: true,
    port: 3000,
  },
});