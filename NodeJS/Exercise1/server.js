const express = require("express");
const app = express();
const PORT = 8000;

setImmediate(() => {
	console.log(1);
});

setTimeout(() => {
	console.log(2);
}, 50);

app.listen(PORT, () => {
	console.log(`server listen on port ${PORT}`);
});
