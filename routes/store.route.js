var storeController = require("../controller/store.controller");
var router = require("express").Router();

module.exports = function() {
    router.post("/store/:id", storeController.createStore);
    router.get("/store", storeController.getAllStore);
    
    router.get("/store/:id", storeController.getStoreById);
    router.put("/store/:id", storeController.updateStore);
    router.delete("/store/:id", storeController.deleteStore);

    router.get("/store/user/:id", storeController.getStoreByUser);
    
    return router;
}