var store = require("../models/store.model");
var storeService = require("./../server/store.service");

var user = require("../models/user.model");

exports.createStore = function (req, res) {

    user.findById(req.body.user).then(userData => {
        if (!userData) {
            return res.status(400).send({ message: "Không có user này" });
        }
        store.findOne({
            email: req.body.email
        }).then(result => {
            if (!result) {
                var newStore = new store({
                    storeName: req.body.storeName,
                    email: req.body.email,
                    image: req.body.image,
                    adress: req.body.adress,
                    phoneNumber: req.body.phoneNumber,
                    product: req.body.product,
                    user: req.body.user
                });
                newStore.save().then((result) => {
                    if (result) {
                        storeService.updateUser(req.body.user, { $push: { store: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                        storeService.updateProduct(req.body.product, { $push: { store: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                    }
                    res.status(201).json({ message: "Thêm cửa hàng thành công" })
                }).catch(err => {
                    res.send(err);
                })
            } else {
                return res.status(404).send({
                    message: "Email này đã được đăng ký, vui lòng kiểm tra lại"
                });
            }
        });
    })
};

exports.getAllStore = function (req, res) {
    store.find().then((store) => {
        if (!store) {
            return res.status(400).send(err);
        } else {
            res.send(store);
        }
    }).catch((err) => {
        res.send(err)
    });
};

exports.getStoreById = function (req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }

    storeService.getStoreById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.getStoreByUser = function (req, res, next) {
    let idUser = req.params.id;
    if (!idUser) {
        res.status(400).send({
            message: err.message
        });
    }

    storeService.getStoreByUser(idUser).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.updateStore = function (req, res, next) {
    var _id = req.params.id;
    var store_data = req.body;

    storeService.updateStore(_id, store_data).then(() => {
        res.send(store_data)
    }).catch((err) => {
        res.status(400).send(err);
    });
    // storeService.updateStore(_id, store_data).then((data) => {
    //     data ? res.send("Update thành công") : res.status(400).send("khong co");

    // }).catch((err) => {
    //     res.send(err)
    // });
}

exports.deleteStore = function (req, res, next) {
    let id = req.params.id;

    storeService.deleteStore(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}