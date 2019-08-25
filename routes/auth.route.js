var authController = require("../controller/auth.controller");
var router = require("express").Router();

module.exports = function() {
    // router.post("/auth/register", authController.register);
    router.post("/auth/signin", authController.sign_in);
    // router.get("/me", authController.me)
    
    return router;
}