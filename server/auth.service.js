var auth = require('../models/user.model');

module.exports = {
    deleteAuth: deleteAuth
}

function deleteAuth(id) {
    return new Promise((res, rej) => {
        auth.find({ _id: id }).exec((err, authData) => {
            if (err) {
                rej(err);
            } else {
                if (!authData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa auth! không có auth này"
                    });
                } else {
                    auth.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Auth delete!"
                            });
                        }
                    });
                }
            }
        });
    });
}