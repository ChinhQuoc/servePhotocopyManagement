var product = require('../models/product.model');
var store = require('../models/store.model');
var order = require('../models/order.model');
var comment = require('../models/comment.model');
var registerRent = require('../models/registerRent.model');

module.exports = {
    getProductById: getProductById,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,

    updateStore: updateStore,
    updateOrder: updateOrder,
    updateComment: updateComment,

    getCommentByIdProduct: getCommentByIdProduct,
    getAllProductByStore: getAllProductByStore,
    getDetailProduct: getDetailProduct,
    updateRegisterRent: updateRegisterRent
}

function getProductById(id) {
    return new Promise((res, rej) => {
        product.findOne({ _id: id }).exec((err, productData) => {
            if (err) {
                rej(err);
            } else {
                if (!productData) {
                    rej({
                        statusCode: 400,
                        message: "Không có sản phẩm này!"
                    })
                } else {
                    res(productData);
                }
            }
        });
    });
}

function getAllProductByStore(id) {
    return new Promise((res, rej) => {
        store.findById(id).populate('product').exec(function(err, productData) {
            if (err) {
                rej(err);
            } else {
                if (!productData) {
                    rej({
                        statusCode: 400,
                        message: 'CỬa hàng này chưa có sản phẩm'
                    })
                } else {
                    res(productData)
                }
            }

        })

    });
}

function updateProduct(id, productData) {
    return product.findByIdAndUpdate(id, productData);
}

function deleteProduct(id) {
    return new Promise((res, rej) => {
        product.find({ _id: id }).exec((err, productData) => {
            if (err) {
                rej(err);
            } else {
                if (!productData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa sản phẩm! không có sản phẩm này"
                    });
                } else {
                    product.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Xóa sản phẩm thành công"
                            });
                        }
                    });
                }
            }
        });
    });
}

function updateStore(id, storeData) {
    return store.findByIdAndUpdate(id, storeData);
}

function updateOrder(id, orderData) {
    return order.findByIdAndUpdate(id, orderData);
}

function updateComment(id, commentData) {
    return comment.findByIdAndUpdate(id, commentData);
}

function updateRegisterRent(id, registerRentData) {
    return registerRent.findByIdAndUpdate(id, registerRentData);
}

function getCommentByIdProduct(id) {
    return new Promise((res, rej) => {
        product.findOne({ _id: id }).exec((err, productData) => {
            if(!productData){
                rej({
                    statusCode: 400,
                    message: err.message
                })
            } else{
                comment.find().then((comment) => {
                    if (!comment) {
                        return res.status(400).send(err);
                    } else {
                        res.send(comment);
                    }
                }).catch((err)=>{
                    res.send(err)
                });
            }
        });
    });
}

function getDetailProduct(id) {
    return new Promise((res, rej) => {
        product.findOne({ _id: id }).populate({path : 'store'}).populate({path: 'registerRent'}).exec((err, productData) => {
            if (err) {
                rej(err);
            } else {
                if (!productData) {
                    rej({
                        statusCode: 400,
                        message: "Không có sản phẩm này!"
                    })
                } else {
                    res(productData);
                }
            }
        });
    });
}
