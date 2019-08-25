var company = require('../models/company.model');
var shipper = require('../models/shipper.model');
var order = require('../models/order.model');

module.exports = {
    getCompanyById: getCompanyById,
    updateCompany: updateCompany,
    deleteCompany: deleteCompany,

    updateShipper: updateShipper,
    updateOrder: updateOrder
}

function getCompanyById(id) {
    return new Promise((res, rej) => {
        company.findOne({ _id: id }).exec((err, companyData) => {
            if (err) {
                rej(err);
            } else {
                if (!companyData) {
                    rej({
                        statusCode: 400,
                        message: "Không có công ty này"
                    })
                } else {
                    res(companyData);
                }
            }
        });
    });
}

function updateCompany(id, companyData) {
    return company.findByIdAndUpdate(id, companyData);
}

function deleteCompany(id) {
    return new Promise((res, rej) => {
        company.find({ _id: id }).exec((err, companyData) => {
            if (err) {
                rej(err);
            } else {
                if (!companyData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa company! không có company này"
                    });
                } else {
                    company.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Xóa company thành công"
                            });
                        }
                    });
                }
            }
        });
    });
}

function updateShipper(id, shiperData) {
    return shipper.findByIdAndUpdate(id, shiperData);
}

function updateOrder(id, orderData){
    return order.findByIdAndUpdate(id, orderData);
}