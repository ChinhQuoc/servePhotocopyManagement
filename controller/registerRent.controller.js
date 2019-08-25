var registerRent = require("../models/registerRent.model");
var registerRentService = require("../server/registerRent.service");

var product = require("../models/product.model")

exports.createRegisterRent = function (req, res) {
    product.findById(req.body.product).then(productData => {
        if (!productData) {
            return res.status(400).send({ message: "Không có product này" });
        }
        var newRegisterRent = new registerRent({
            price: req.body.price,
            date: req.body.date,
            // timeBegin: req.body.timeBegin,
            // timeEnd: req.body.timeEnd,
            product: req.body.product
        });
        newRegisterRent.save().then((result) => {
            if (result) {
                registerRentService.updateProduct(req.body.product, { $push: { registerRent: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
            }
            res.status(201).json({ message: "Add register rent successfully" })
        }).catch(err => {
            return res.send(err.message);
        })
    })
};

exports.getAllRegisterRent = function(req, res) {
    registerRent.find().then((registerRent) => {
        if (!registerRent) {
            return res.status(400).send(err);
        } else {
            res.send(registerRent);
        }
    }).catch((err)=>{
        res.send(err)
    });
};

exports.getRegisterById = function(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }
    registerRentService.getRegisterRentById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.updateRegisterRent = function(req, res, next) {
    var _id = req.params.id;
    var registerRent_data = req.body;

    registerRentService.updateRegisterRent(_id, registerRent_data).then(() => {
        res.send(registerRent_data)
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.deleteRegisterRent = function(req, res, next) {
    let id = req.params.id;

    registerRentService.deleteRegisterRent(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}

exports.getAllRegisterRentByProduct = function (req, res, next) {
    let idRegis = req.params.id;
    if (!idRegis) {
        res.status(400).send({
            message: err.message
        });
    }

    registerRentService.getRegisterRentByProduct(idRegis).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}