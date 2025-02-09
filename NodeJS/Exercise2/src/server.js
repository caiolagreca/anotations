import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

//get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
console.log("log1:", __filename);
//get the directory name from the file path
const __dirname = dirname(__filename);
console.log("log2:", __dirname);

//serves the HTML file from the /public directory
//tells express to serve all files from the public folder as static /file. Any requests for the css file will be resolved to the public directory.
app.use(express.static(path.join(__dirname, "../public")));

//serving up the HTML file from the /public directory
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`server listen on port ${PORT}`);
});
