const User = require('../models/user.module');

module.exports = {
    create(user, callback) {
        console.log('body.content---------> ', user);
        const objUsers = new User();
        objUsers.firstName = user.firstName;
        objUsers.lastName = user.lastName;
        objUsers.email = user.email;
        objUsers.password = user.password;
        console.log('objUsers model obj--------> ', objUsers);

        objUsers.save().then(data => {
            console.log('after saved------>', data);
            return callback(null, data);
        }).catch(err => {
            return callback({ message: "something went wrong" })
        })
    },



    findAll(data, callback) {
        console.log('objNotes model obj--------------->', data);
        User.find().then(data => {
            return callback(null, data)
        }).catch(err => {
            return callback({ message: err.message || "Some Error Occurred while retrieving notes" })
        });
    },

    findOne(data, callback) {
        console.log("servics"+data);
        User.findOne(data)
            .then(data1 => {
                console.log("note data--> ", data1)
                return callback(null, data1)
            }).catch(err => {
                return callback({ message: "Error retrieving with node Id" })
            })
    },


    // update(data, callback) {
    //     User.updateOne({ "id": data.params.userId }, { $set: { 'title': data.body.email } })
    //         .then(note => {
    //             return callback(null, user);
    //         }).catch(err => {
    //             return callback({ message: "Error occurred while updating" })
    //         })
    // },

    deleting(data, callback) {
        console.log('data in services------------>', data);
        User.findOneAndDelete(data)
            .then(note => {
                return callback(null, user);
            }).catch(err => {
                return callback({ message: "Error occurred while deleting" })
            })
    },

    findToken(data, callback) {
        console.log("asjkfhvk",data);
        User.find(data)
            .then(data => {

                return callback(null, data)
            }).catch(err => {
                return callback({ message: "Error while retrieving login id" })
            })

    },

}