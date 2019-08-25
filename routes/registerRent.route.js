var registerRentController = require("../controller/registerRent.controller");
var router = require("express").Router();

module.exports = function() {
    router.post("/registerrent/:id", registerRentController.createRegisterRent);
    router.get("/registerrent", registerRentController.getAllRegisterRent);
    
    router.get("/registerrent/:id", registerRentController.getRegisterById);
    router.put("/registerrent/:id", registerRentController.updateRegisterRent);
    router.delete("/registerrent/:id", registerRentController.deleteRegisterRent);

    // router.get("/product/comment/:id", );
    router.get("/registerrent/product/:id", registerRentController.getAllRegisterRentByProduct);
    
    return router;
}