var auth = require("../models/user.model");
// var authService = require("./../server/auth.service");

exports.sign_in = function (req, res) {
    console.log(req.body);

    auth.findOne({ email: req.body.email }).then(auth => {
        if (!auth) {
            return res.status(404).send("Sai email");
        } else {
            if (auth.password === req.body.password) {
                return res.status(200).send(auth);
            } else {
                return res
                    .status(404)
                    .send({ message: "Sai password!!!" });
            }
        }
    });
};

// exports.me = function(req, res, next){
//     console.log(req.user);
//     return res.status(200).json({profile: req.user});
// }