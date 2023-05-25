import { WebpackConfiguration } from "webpack-dev-server";
import webpack from 'webpack'
import base from "./base";
const main: (env: { dev: boolean }) => WebpackConfiguration = ({ dev }) => ({
    entry: {
        main: "./src/main"
    },
    target: 'electron-main',
    ...base({ dev })
})
export default main;