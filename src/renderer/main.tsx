import { CheckGame } from "auth/GameCheck";
import Render from "./index";
import { XboxLoginMS } from "auth/XboxLogin";
import { MCAuthMS } from "auth/MinecraftAuth";


const root = document.createElement('div');
root.id = "root"
console.log(root)
document.body.append(root);
Render(root)