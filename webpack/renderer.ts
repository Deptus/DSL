import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import init from "./init";
import { WebpackConfiguration } from "webpack-dev-server";
import isDev from 'electron-is-dev'

const config: (env: { dev: boolean }) => WebpackConfiguration = ({ dev }) => ({
  entry: {
    app: "./src/renderer/main.tsx",
  },
  target: 'electron-renderer',
  devServer: {
    port: 3500,
    hot: true,
  },
  ...init({ dev }, [
    new MiniCssExtractPlugin(),
    new HtmlPlugin({
      inject: true,
      title: "Designer Launcher",
      meta: { charset: "utf8" },
      minify: true,
    }),
    dev ? new ReactRefreshPlugin() : new CssMinimizerPlugin(),
  ]),
});

export default config;
