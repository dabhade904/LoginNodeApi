const jwt = require('jsonwebtoken');
var key = "secreatkey";

exports.userLogin = (data1, callback) => {
    userData = {
        userId: data1.userId
    };
    console.log(userData);

    jwt.sign(userData, key, (err, token) => {
        if (err) {
                return callback("token is created......")
        } else {
            console.log("asdfghjk" + token);
            return callback(null, token)
        }
    });
};