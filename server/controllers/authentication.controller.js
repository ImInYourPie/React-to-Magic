const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: ONE_WEEK
    })
}

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
    static async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username: username }).lean();

            if (!user) {
                return res.status(400).send({ error: "O nome de utilizador que inseriu não existe" })
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).send({ error: "A password que inseriu está incorreta" })
            }

            delete user.password;
            delete user.__v;
            res.status(200).send({ user: user, token: jwtSignUser(user) });
        } catch (error) {
            res.status(500).send({ error: "Alguma coisa correu mal, mas não é culpa tua :)" });
        }
    }

    // TESTING PURPOSES
    static async test(req, res) {
        const users = await User.find({}).lean();
        res.status(200).send(users);
    }

}


module.exports = Authentication;