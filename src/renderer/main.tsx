import Render from "./index";

if(process.env.NODE_ENV === "development")
    document.head.innerHTML = `
    <script src="http://localhost:8097"></script>
    `
const root = document.createElement('div');
root.id = "root"
console.log(root)
document.body.append(root);

Render(root)