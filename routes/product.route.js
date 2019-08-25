var productController = require("../controller/product.controller");
var router = require("express").Router();

module.exports = function() {
    router.post("/product/:id", productController.createProduct);
    router.get("/product", productController.getAllProduct);
    
    router.get("/product/:id", productController.getProductById);
    router.put("/product/:id", productController.updateProduct);
    router.delete("/product/:id", productController.deleteProduct);

    // router.get("/product/comment/:id", );
    router.get("/product/store/:id", productController.getAllProductByStore);
    router.get("/product/detail/:id", productController.getDetailProduct);
    // router.get("/product/productstore/:id", productController.getProductAnStoreByIdProduct);
    
    return router;
}