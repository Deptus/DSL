import { WebpackConfiguration } from "webpack-dev-server";
import MiniCss from "mini-css-extract-plugin";
import { WebpackPluginInstance } from 'webpack';
import path from "path";
import tsconfig from '../tsconfig.json'
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';

function AliasGen() {
  const { paths, baseUrl } = tsconfig.compilerOptions;
  const aliases: { [key: string]: string } = {};
  Object.entries(paths).forEach(([item, value]) => {
    const key = item.replace("/*", "");
    aliases[key] = path.resolve(baseUrl, value[0].replace("/*", "").replace("*", ""));
  });
  return aliases;
}


const config: ( env: { dev: boolean }, plugins?: WebpackPluginInstance[] ) => WebpackConfiguration = ({ dev }, plugins = []) => ({
    mode: dev ? "development" : "production",
    devtool: "source-map",
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.(tsx|ts)?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            
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
        {
          test: /\.js$/,
          exclude: /node_modules/, // 要排除
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              "presets": [
                ["@babel/preset-env", { modules: false }]
              ],
              "plugins": [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-transform-regenerator"
              ],
            }
          }
        }

      ],
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      alias: AliasGen()
    },
    output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
    },
    plugins: [new ForkTsCheckerPlugin(), ...plugins],
 });
export default config;