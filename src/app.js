// "use strict";
// exports.__esModule = true;
// var dotenv_1 = require("dotenv");
// var express_1 = require("express");
// var CompositionRoot_1 = require("./CompositionRoot");
// dotenv_1["default"].config();
// CompositionRoot_1["default"].configure();
// var PORT = process.env.PORT;
// var app = (0, express_1["default"])();
// var cors = require("cors");
// app.use(cors());
// app.use(express_1["default"].json());
// app.use(express_1["default"].urlencoded({ extended: true }));
// // Routes
// app.use("/auth", CompositionRoot_1["default"].authRouter());
// app.use("/jobs", CompositionRoot_1["default"].jobRouter());
// app.use("/profile", CompositionRoot_1["default"].profileRouter());
// app.use("/message", CompositionRoot_1["default"].messageRouter());
// app.use("/review", CompositionRoot_1["default"].reviewRouter());
// app.listen(PORT, function () {
// 	return console.log("listening on port ".concat(PORT));
// });

const express = require('express');
const app = express();
app.get('/',(req,res)=>{
	res.send('<h1>My Node App</h1>');
});

app.listen(5500, ()=>{
	console.log('App listening on port 5500');
})
