var user = require("../models/user.model");
var userService = require("./../server/user.service");

exports.createUser = function(req, res) {
    user.findOne({
        email: req.body.email
    }).then(result => {
        if (!result) {
            var link = 'https://photocopy-database.s3.amazonaws.com/Image_user/';
            var newUser = new user({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: req.body.password,
                image: link + req.body.image,
                adress: req.body.adress,
                store: req.body.store,
                comment: req.body.comment,
                order: req.body.order
            });
            newUser.save().then((result) => {
                if (result) {
                    userService.updateStore(req.body.store, { $push: { user: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                    userService.updateComment(req.body.comment, { $push: { user: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                    userService.updateOrder(req.body.order, { $push: { user: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
                }
                res.status(201).json({ message: "Add user successfully" })
            }).catch(err => {
                res.send(err);
            })
        } else {
            return res.status(404).send({
                message: "Email này đã được đăng ký, vui lòng kiểm tra lại"
            });
        }
    });
};

exports.getAllUser = function(req, res) {
    user.find().then((user) => {
        if (!user) {
            return res.status(400).send(err);
        } else {
            res.send(user);
        }
    }).catch((err)=>{
        res.send(err)
    });
};

exports.getUserById = function(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }
    userService.getUserById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.updateUser = function(req, res, next) {
    var _id = req.params.id;
    var user_data = req.body;

    userService.updateUser(_id, user_data).then(() => {
        res.send(user_data)
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.deleteUser = function(req, res, next) {
    let id = req.params.id;

    userService.deleteUser(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}