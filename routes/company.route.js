var companyController = require("../controller/company.controller");
var router = require("express").Router();

module.exports = function() {
    router.post("/company", companyController.createCompany);
    router.get("/company", companyController.getAllCompany);
    
    router.get("/company/:id", companyController.getCompanyById);
    router.put("/company/:id", companyController.updateCompany);
    router.delete("/company/:id", companyController.deleteCompany);
    
    return router;
}