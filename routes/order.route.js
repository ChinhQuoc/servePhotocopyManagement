var orderController = require("../controller/order.controller");
var router = require("express").Router();

module.exports = function() {
    router.post("/order/:id", orderController.createOrder);
    router.get("/order", orderController.getAllOrder);
    
    router.get("/order/:id", orderController.getOrderById);
    router.put("/order/:id", orderController.updateOrder);
    router.delete("/order/:id", orderController.deleteOrder);

    router.get("/order/user/:id", orderController.getAllOrderByUser);
    router.get("/order/product/:id", orderController.getOrderByIdProduct);
    
    return router;
}