const { getAllUsers } = require("./userController");

const router = require("express").Router();



router.get("/allusers/:id", getAllUsers);



module.exports = router;
