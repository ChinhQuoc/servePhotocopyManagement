var shipper = require('../models/shipper.model');
var company = require('../models/comment.model');
var order = require('../models/order.model');

module.exports = {
    getShipperById: getShipperById,
    updateShiper: updateShiper,
    deleteShipper: deleteShipper,

    updateCompany: updateCompany,
    updateOrder: updateOrder,
    getAllShipperByCompany: getAllShipperByCompany
}

function getShipperById(id) {
    return new Promise((res, rej) => {
        shipper.findOne({ _id: id }).exec((err, shipperData) => {
            if (err) {
                rej(err);
            } else {
                if (!shipperData) {
                    rej({
                        statusCode: 400,
                        message: "Không có shipper này"
                    })
                } else {
                    res(shipperData);
                }
            }
        });
    });
}

function updateShiper(id, shipperData) {
    return shipper.findByIdAndUpdate(id, shipperData);
}

function deleteShipper(id) {
    return new Promise((res, rej) => {
        shipper.find({ _id: id }).exec((err, shipperData) => {
            if (err) {
                rej(err);
            } else {
                if (!shipperData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa shipper! không có shipper này"
                    });
                } else {
                    shipper.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Xóa shipper thành công"
                            });
                        }
                    });
                }
            }
        });
    });
}


function getAllShipperByCompany(id) {
    return new Promise((res, rej) => {
        company.findById(id).populate('shipper').exec(function(err, shipperData) {
            if (err) {
                rej(err);
            } else {
                if (!shipperData) {
                    rej({
                        statusCode: 400,
                        message: 'Không có shipper nào'
                    })
                } else {
                    res(shipperData)
                }
            }

        })

    });
}


function updateCompany(id, companyData){
    return company.findByIdAndUpdate(id, companyData);
}

function updateOrder(id, orderData){
    return order.findByIdAndUpdate(id, orderData);
}