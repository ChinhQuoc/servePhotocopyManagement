var userController = require("../controller/user.controller");
var router = require("express").Router();

module.exports = function() {
    router.post("/user", userController.createUser);
    router.get("/user", userController.getAllUser);
    
    router.get("/user/:id", userController.getUserById);
    router.put("/user/:id", userController.updateUser);
    router.delete("/user/:id", userController.deleteUser);
    
    return router;
}