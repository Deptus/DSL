import { WebpackConfiguration } from "webpack-dev-server";
import init from "./init"
const main: (env: { dev: boolean }) => WebpackConfiguration = ({ dev }) => ({
    entry: {
        main: "./src/main"
    }
    ...init({ dev })
})
export default main;