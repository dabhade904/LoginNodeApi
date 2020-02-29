const create = require('../service/user.service');
const verify = require('../token');
const bcrypt = require('bcryptjs');
var key = "secreatkey";
const jwt=require('jsonwebtoken');

exports.create = (req, res) => {
    console.log("email................." + req.body.email);

    if (!req.body.password) {
        return res.status(500).send({
            message: "connot empty"
        });
    }

    console.log("body.password------> ", req.body.password);
    const users = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    };

    create.create(users, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "some error has occured"
            })
        }
        console.log("inside controller-----> ", data);
        res.send(data);
    })

}

exports.findAll = (req, res) => {
    create.findAll(req, ((err, data) => {
        if (err) {
            message: "something went wrong"
        }
        res.send(data);
    }))
}

exports.findOne = (req, res) => {
    console.log(req.body.email);
    
    create.findOne(
        { email: req.body.email }, function (err, data) {
            if (err) {
                res.status(404).send({
                    message: err.message || "something went wrong"
                });
            } else {
                console.log("finded data" + data);
                verify.userLogin(data, (err, data) => {
                    if (err) {
                        console.log("somthing wrong");
                    }
                    res.send(data, "Please enter valid token ");
                })
            }
        })
}

// exports.update = (req, res) => {
//     create.update(req, function (err, data) {
//         if (err) {
//             message: "some error ocurred"
//         }
//         res.send(data);
//     })
// }

exports.delete = (req, res) => {
    create.deleting(req.userId, function (err, data) {
        if (err) {
            message: "something went wrong"
        }
        res.send(data)
    })
}

exports.findToken = (req, res) => {
    console.log(req.headers.token);
    
    jwt.verify(req.headers.token, key, (err, data) => {
        if (err) {
            console.log("something wrong.....");
        }
        else {
            var token = req.headers.token;
            var header = jwt.decode(token);

            // create.findOne(data.body.userId, ((err, data) => {
            //     if (err) {
            //         console.log("something wrong----->.");
            //     }
            //    1 console.log("data find by id -->", data);

                res.send(header);
           // }))
        }
    })
}
