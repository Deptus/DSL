import { WebpackConfiguration } from "webpack-dev-server";
import webpack from 'webpack'
import init from "./init";
const main: (env: { dev: boolean }) => WebpackConfiguration = ({ dev }) => ({
    entry: {
        main: "./src/main"
    },
    target: 'electron-main',
    ...init({ dev })
})
export default main;