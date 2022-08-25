var express = require("express");
var router = express.Router();
var addTodo = require("../controllers/todoController");

/* GET home page. */
router.route("/addTodo").post(addTodo);

module.exports = router;
