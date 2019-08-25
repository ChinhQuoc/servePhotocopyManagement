var commentController = require("../controller/comment.controller");
var router = require("express").Router();

module.exports = function() {
    router.post("/comment/:id", commentController.createComment);
    router.get("/comment", commentController.getAllComment);
    
    router.get("/comment/:id", commentController.getCommentById);
    router.put("/comment/:id", commentController.updateComment);
    router.delete("/comment/:id", commentController.deleteComment);

    router.get("/comment/product/:id", commentController.getCommentByProduct);
    
    return router;
}