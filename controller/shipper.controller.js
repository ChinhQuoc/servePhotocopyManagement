var shipper = require("../models/shipper.model");
var shipperService = require("./../server/shipper.service");

exports.createShipper = function (req, res) {
    shipper.findOne({
        phoneNumber: req.body.phoneNumber
    }).then(result => {
        if (!result) {
            var newShipper = new shipper({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                avatar: req.body.avatar,
                order: req.body.order,
                company: req.body.company
            });
            newShipper.save().then((result) => {
                if (result) {

                    // shipperService.updateOrder(req.body.order, { $push: { shipper: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                    shipperService.updateCompany(req.body.company, { $push: { shipper: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                }
                res.status(201).json({ message: "Thêm shipper thành công" })
            }).catch(err => {
                res.send(err);
            })
        } else {
            return res.status(404).send({
                message: "Số điện thoại này đã được đăng ký, vui lòng kiểm tra lại"
            });
        }
    });
};

exports.getAllShipper = function (req, res) {
    shipper.find().then((shipper) => {
        if (!shipper) {
            return res.status(400).send(err);
        } else {
            res.send(shipper);
        }
    }).catch((err)=>{
        res.send(err)
    });
};

exports.getShipperById = function (req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }

    shipperService.getShipperById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.updateShipper = function (req, res, next) {
    var _id = req.params.id;
    var shipper_data = req.body;

    shipperService.updateShiper(_id, shipper_data).then(() => {
        res.send(shipper_data)
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.deleteShipper = function (req, res, next) {
    let id = req.params.id;

    shipperService.deleteShipper(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}

exports.getAllShipperByCompany = function (req, res, next) {
    let idCompany = req.params.id;
    if (!idCompany) {
        res.status(400).send({
            message: err.message
        });
    }

    shipperService.getAllShipperByCompany(idCompany).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}