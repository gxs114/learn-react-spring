import { createRoot } from "react-dom/client";
import App from "./index";

const app = createRoot(document.querySelector("#root")!)
app.render(<App/>)