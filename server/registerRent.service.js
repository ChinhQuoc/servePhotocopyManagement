var registerRent = require('../models/registerRent.model');
var product = require('../models/product.model');

module.exports = {
    getRegisterRentById: getRegisterRentById,
    updateRegisterRent: updateRegisterRent,
    deleteRegisterRent: deleteRegisterRent,

    updateProduct: updateProduct,
    getRegisterRentByProduct: getRegisterRentByProduct
}

function getRegisterRentById(id) {
    return new Promise((res, rej) => {
        registerRent.findOne({ _id: id }).exec((err, registerRentData) => {
            if (err) {
                rej(err);
            } else {
                if (!registerRentData) {
                    rej({
                        statusCode: 400,
                        message: "Không có công ty này"
                    })
                } else {
                    res(registerRentData);
                }
            }
        });
    });
}

function updateRegisterRent(id, registerRentData) {
    return registerRent.findByIdAndUpdate(id, registerRentData);
}

function deleteRegisterRent(id) {
    return new Promise((res, rej) => {
        registerRent.find({ _id: id }).exec((err, registerRentData) => {
            if (err) {
                rej(err);
            } else {
                if (!registerRentData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa register Rent! không có register Rent này"
                    });
                } else {
                    registerRent.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Xóa register Rent thành công"
                            });
                        }
                    });
                }
            }
        });
    });
}

function updateProduct(id, productData) {
    return product.findByIdAndUpdate(id, productData);
}

function getRegisterRentByProduct(id) {
    return new Promise((res, rej) => {
        product.findById(id).populate({path : 'store'}).populate({path: 'registerRent'}).exec(function(err, registerRentData) {
            if (err) {
                rej(err);
            } else {
                if (!registerRentData) {
                    rej({
                        statusCode: 400,
                        message: 'Không có register rent này'
                    })
                } else {
                    res(registerRentData)
                }
            }

        })

    });
}
