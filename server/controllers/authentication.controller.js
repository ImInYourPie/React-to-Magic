const bcrypt = require("bcrypt");
const User = require("../models/user");

class Authentication {

    static register(req, res) {

        // NEW USER WITH BODY PROPERTIES
        let newUser = new User({
            username: req.body.username,
            realName: req.body.realName,
            password: req.body.password,
        });

        // HASH PASSWORD FROM NEWUSER
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err);
            }
            else {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    newUser.password = hash;
                    // SAVE USER AFTER SUCCESFULL HASHING
                    newUser.save((err) => {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            res.status(201).send({ success: "Registo efetuado com sucesso!" }); // SEND SUCCESS MESSAGE
                        }
                    })
                })
            }
        })

    }

    // TESTING PURPOSES
    static async test(req, res){
        const users = await User.find({}).lean();
        res.status(200).send(users);
    }

}


module.exports = Authentication;