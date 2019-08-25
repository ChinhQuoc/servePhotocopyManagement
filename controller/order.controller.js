var order = require("../models/order.model");
var orderService = require("./../server/order.service");

var user = require("../models/user.model");

exports.createOrder = function (req, res) {
    user.findById(req.body.user).then(userData => {
        console.log(userData);
        
        if(!userData){
            return res.status(400).send({message: "Không có user này"});
        }
        var link = 'https://photocopy-database.s3.amazonaws.com/document/';
        var newOrder = new order({
            dateCreate: req.body.dateCreate,
            dateRent: req.body.dateRent,
            dateGet: req.body.dateGet,
            pageTotal: req.body.pageTotal,
            price: req.body.price,
            priceTotal: req.body.priceTotal,
            note: req.body.note,
            document: link + req.body.document,
            product: req.body.product,
            company: req.body.company,
            user: req.body.user
        });
        // console.log(newOrder);
        
        newOrder.save().then((result) => {
            if (result) {
                orderService.updateUser(req.body.user, { $push: { order: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                orderService.updateProduct(req.body.product, { $push: { order: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                orderService.updateCompany(req.body.company, { $push: { order: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
            }
            res.status(200).json({ newOrder }) // message: "Add order successfully"
        }).catch(err => {
            return res.send(err.message);
        })
    })
};

exports.getAllOrder = function(req, res) {
    order.find().then((order) => {
        if (!order) {
            return res.status(400).send(err);
        } else {
            res.send(order);
        }
    }).catch((err)=>{
        res.send(err)
    });
};

exports.getOrderById = function(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }
    orderService.getOrderById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.updateOrder = function(req, res, next) {
    var _id = req.params.id;
    var order_data = req.body;

    orderService.updateOrder(_id, order_data).then(() => {
        res.send(order_data)
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.deleteOrder = function(req, res, next) {
    let id = req.params.id;

    orderService.deleteOrder(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}

exports.getAllOrderByUser = function (req, res, next) {
    let idUser = req.params.id;
    if (!idUser) {
        res.status(400).send({
            message: err.message
        });
    }
    
    orderService.getAllOrderByUser(idUser).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.getOrderByIdProduct = function (req, res, next) {
    let idProduct = req.params.id;
    if (!idProduct) {
        res.status(400).send({
            message: err.message
        });
    }
    
    orderService.getOrderByIdProduct(idProduct).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}
