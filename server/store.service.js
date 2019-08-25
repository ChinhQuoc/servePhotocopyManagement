var store = require('../models/store.model');
var user = require('../models/user.model');
var product = require('../models/product.model');

module.exports = {
    getStoreById: getStoreById,
    updateStore: updateStore,
    deleteStore: deleteStore,

    updateProduct: updateProduct,
    updateUser: updateUser,

    getStoreByUser: getStoreByUser
}

function getStoreById(id) {
    return new Promise((res, rej) => {
        store.findOne({ _id: id }).exec((err, storeData) => {
            if (err) {
                rej(err);
            } else {
                if (!storeData) {
                    rej({
                        statusCode: 400,
                        message: "Không tìm thấy cửa hàng này"
                    })
                } else {
                    res(storeData);
                }
            }
        });
    });
}

function getStoreByUser(id) {
    return new Promise((res, rej) => {
        user.findById(id).populate('store').exec(function(err, storeData) {
            if (err) {
                rej(err);
            } else {
                if (!storeData) {
                    rej({
                        statusCode: 400,
                        message: 'Không có store này'
                    })
                } else {
                    res(storeData)
                }
            }

        })

    });
}

function updateStore(id, storeData) {
    return store.findByIdAndUpdate(id, storeData);
}

function deleteStore(id) {
    return new Promise((res, rej) => {
        store.find({ _id: id }).exec((err, storeData) => {
            if (err) {
                rej(err);
            } else {
                if (!storeData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa cửa hàng! không có cửa hàng này"
                    });
                } else {
                    store.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Xóa cửa hàng thành công"
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

function updateUser(id, userData) {
    return user.findByIdAndUpdate(id, userData);
}