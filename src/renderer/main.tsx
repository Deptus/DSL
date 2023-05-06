import { CheckGame } from "auth/GameCheck";
import Render from "./index";
import { XboxLoginMS } from "auth/XboxLogin";
import { MCAuthMS } from "auth/MinecraftAuth";

if(process.env.NODE_ENV === "development")
    document.head.innerHTML = `
    <script src="http://localhost:8097"></script>
    `

const root = document.createElement('div');
root.id = "root"
console.log(root)
document.body.append(root);
const a = MCAuthMS()
console.log(a)
Render(root)