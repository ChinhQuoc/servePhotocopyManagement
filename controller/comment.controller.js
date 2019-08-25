var comment = require("../models/comment.model");
var commentService = require("./../server/comment.service");

var user = require("../models/user.model");

exports.createComment = function (req, res) {

    user.findById(req.body.user).then(userData => {
        if (!userData) {
            return res.status(400).send({ message: "Không có user này" });
        }
        var newComment = new comment({
            cmt: req.body.cmt,
            user: req.body.user,
            product: req.body.product
        });
        newComment.save().then((result) => {
            commentService.updateUser(req.body.user, { $push: { comment: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
            commentService.updateProduct(req.body.product, { $push: { comment: result._id } }).then(() => res.send('ahihi')).catch(err => res.send(err))
            res.status(201).json({ message: "Add comment successfully" })
        }).catch(err => {
            return res.send(err.message);
        })
    })
};

exports.getAllComment = function (req, res) {
    comment.find().then((comment) => {
        if (!comment) {
            return res.status(400).send(err);
        } else {
            res.send(comment);
        }
    }).catch((err) => {
        res.send(err)
    });
};

exports.getCommentById = function (req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: err.message
        });
    }
    commentService.getCommentById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.updateComment = function (req, res, next) {
    var _id = req.params.id;
    var comment_data = req.body;

    commentService.updateComment(_id, comment_data).then(() => {
        res.send(comment_data)
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.deleteComment = function (req, res, next) {
    let id = req.params.id;

    commentService.deleteComment(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}

exports.getCommentByProduct = function (req, res, next) {
    let idProduct= req.params.id;
    if (!idProduct) {
        res.status(400).send({
            message: err.message
        });
    }

    commentService.getCommentByProduct(idProduct).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
}