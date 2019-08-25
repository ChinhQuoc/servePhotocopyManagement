var company = require("../models/company.model");
var companyService = require("./../server/company.service");

exports.createCompany = function(req, res) {
    var newCompany = new company({
        companyName: req.body.companyName,
        delivery: req.body.delivery,
        email: req.body.email,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        shipper: req.body.shipper,
        order: req.body.order
    });
    newCompany.save().then((result) => {
        if (result) {
            companyService.updateShipper(req.body.shipper, { $push: { company: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
            companyService.updateOrder(req.body.order, { $push: { company: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
        }
        res.status(201).json({ message: "Add company successfully" })
    }).catch(err => {
        return res.send(err.message);
    })
};

exports.getAllCompany = function(req, res) {
    company.find().then((company) => {
        if (!company) {
            return res.status(400).send(err);
        } else {
            res.send(company);
        }
    }).catch((err)=>{
        res.send(err)
    });
};

exports.getCompanyById = function(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }
    companyService.getCompanyById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.updateCompany = function(req, res, next) {
    var _id = req.params.id;
    var company_data = req.body;

    companyService.updateCompany(_id, company_data).then(() => {
        res.send(company_data)
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.deleteCompany = function(req, res, next) {
    let id = req.params.id;

    companyService.deleteCompany(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}