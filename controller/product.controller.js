var product = require("../models/product.model");
var productService = require("./../server/product.service");

var store = require("../models/store.model")

exports.createProduct = function (req, res) {
    store.findById(req.body.store).then(storeData => {
        if (!storeData) {
            return res.status(400).send({ message: "Không có cửa hàng này" });
        }
        var newProduct = new product({
            productName: req.body.productName,
            speed: req.body.speed,
            image: req.body.image,
            store: req.body.store,
            order: req.body.order,
            comment: req.body.comment,
            registerRent: req.body.registerRent
        });
        newProduct.save().then((result) => {
            if (result) {
                productService.updateStore(req.body.store, { $push: { product: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                productService.updateOrder(req.body.order, { $push: { product: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                productService.updateComment(req.body.comment, { $push: { product: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                productService.updateRegisterRent(req.body.registerRent, { $push: { product: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
            }
            res.status(201).json({ message: "Add product successfully" })
        }).catch(err => {
            return res.send(err.message);
        })
    })
};

exports.getAllProduct = function(req, res) {
    product.find().populate({path : 'store'}).populate({path: 'registerRent'}).then((product) => {
        if (!product) {
            return res.status(400).send(err);
        } else {
            res.send(product);
        }
    }).catch((err)=>{
        res.send(err)
    });
};

exports.getProductById = function(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }
    productService.getProductById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.updateProduct = function(req, res, next) {
    var _id = req.params.id;
    var product_data = req.body;

    productService.updateProduct(_id, product_data).then(() => {
        res.send(product_data)
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.deleteProduct = function(req, res, next) {
    let id = req.params.id;

    productService.deleteProduct(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}


exports.getDetailProduct = function(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }
    productService.getDetailProduct(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}


// exports.getCommentByIdProduct = function(req, res, next) {
//     let id = req.params.id;
//     if (!id) {
//         res.status(400).send({
//             message: err.message
//         });
//     }
//     productService.getCommentByIdProduct(id).then((response) => {
//         res.send(response);
//     }).catch((err) => {
//         res.status(400).send(err);
//     });
// }

exports.getAllProductByStore = function (req, res, next) {
    let idStore = req.params.id;
    if (!idStore) {
        res.status(400).send({
            message: err.message
        });
    }
    
    productService.getAllProductByStore(idStore).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}
