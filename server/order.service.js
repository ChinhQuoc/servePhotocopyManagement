var order = require('../models/order.model');
var user = require('../models/user.model');
var product = require('../models/product.model');
var company = require('../models/company.model');

module.exports = {
    getOrderById: getOrderById,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,

    updateUser: updateUser,
    updateProduct: updateProduct,
    updateCompany: updateCompany,
    getAllOrderByUser: getAllOrderByUser,
    getOrderByIdProduct: getOrderByIdProduct
}

function getOrderById(id) {
    return new Promise((res, rej) => {
        order.findOne({ _id: id }).populate([{path: 'order'}, {path: 'company'}, {path: 'user'}]).exec((err, orderData) => {
            if (err) {
                rej(err);
            } else {
                if (!orderData) {
                    rej({
                        statusCode: 400,
                        message: "Không có Order này!"
                    })
                } else {
                    res(orderData);
                }
            }
        });
    });
}

function updateOrder(id, orderData) {
    return order.findByIdAndUpdate(id, orderData);
}

function deleteOrder(id) {
    return new Promise((res, rej) => {
        order.find({ _id: id }).exec((err, orderData) => {
            if (err) {
                rej(err);
            } else {
                if (!orderData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa order! không có order này"
                    });
                } else {
                    order.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Xóa order thành công"
                            });
                        }
                    });
                }
            }
        });
    });
}

function updateUser(id, userData) {
    return user.findByIdAndUpdate(id, userData);
}

function updateProduct(id, productData) {
    return product.findByIdAndUpdate(id, productData);
}

function updateCompany(id, companyData) {
    return company.findByIdAndUpdate(id, companyData);
}

function getAllOrderByUser(id) {
    return new Promise((res, rej) => {
        user.findById(id).populate({path : 'order', populate: [{path: 'product', populate: {path: 'store'}}, {path: 'company'}]}).exec(function(err, orderData) {
            if (err) {
                rej(err);
            } else {
                if (!orderData) {
                    rej({
                        statusCode: 400,
                        message: 'Bạn chưa có order nào'
                    })
                } else {
                    res(orderData)
                }
            }

        })

    });
}

function getOrderByIdProduct(id) {
    return new Promise((res, rej) => {
        product.findById(id).populate({path : 'order', populate: [{path: 'product', populate: {path: 'store'}}, {path: 'company'}]}).exec(function(err, orderData) {
            if (err) {
                rej(err);
            } else {
                if (!orderData) {
                    rej({
                        statusCode: 400,
                        message: 'Bạn chưa có order nào'
                    })
                } else {
                    res(orderData)
                }
            }

        })

    });
}