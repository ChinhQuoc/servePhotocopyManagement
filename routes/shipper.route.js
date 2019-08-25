var shipperController = require("../controller/shipper.controller");
var router = require("express").Router();

module.exports = function() {
    router.post("/shipper", shipperController.createShipper);
    router.get("/shipper", shipperController.getAllShipper);
    
    router.get("/shipper/:id", shipperController.getShipperById);
    router.put("/shipper/:id", shipperController.updateShipper);
    router.delete("/shipper/:id", shipperController.deleteShipper);

    router.get("/shipper/company/:id", shipperController.getAllShipperByCompany);

    return router;
}