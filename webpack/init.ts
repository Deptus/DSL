import { WebpackConfiguration } from "webpack-dev-server";
import MiniCss from "mini-css-extract-plugin";
import { WebpackPluginInstance } from 'webpack';
import path from "path";
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import fs from 'fs'

const config: ( env: { dev: boolean }, plugins?: WebpackPluginInstance[] ) => WebpackConfiguration = ({ dev }, plugins = []) => ({
    mode: dev ? "development" : "production",
    devtool: dev ? "inline-source-map" : undefined,
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.css$/,
          use: [MiniCss.loader, "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: "file-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
    },
    plugins: [new ForkTsCheckerPlugin(), ...plugins],
 });
export default config;