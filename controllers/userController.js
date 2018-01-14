var mongose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    auth_settings = require('../auth_settings.json'),
    bcrypt = require('bcrypt'),
    AppUser = require('../models/app_user');
class UserController {
    constructor() {

    }

    register(req, res) {
        console.log(req.body);
        let newUser = new AppUser(req.body.user);
        newUser.hash_password = bcrypt.hashSync(req.body.user.password, 10);
        newUser.save((err, user) => {
            console.log(err);
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                user.hash_password = undefined;

                return res.json(user);
            }
        })
    }

    sign_in(req, res) {

        AppUser.findOne({
            username: req.body.username
        }).then((user, err) => {
            if (err) throw err;
            if (!user)
                return res.status(401).json({
                    message: 'Authentication failed. User not found.'
                });
            if (user) {
                if (!user.comparePassword(req.body.password))
                    return res.status(401).json({
                        message: 'Authentication failed. Wrong password.'
                    });
                try {
                    delete user.hash_password;
                } catch (err) {
                    console.log("err while deleting hash_password from user object");
                }
                return res.json({
                    token: jwt.sign(JSON.parse(JSON.stringify(user)), auth_settings.secret)
                });

            }
        });

    }
    loginRequired(req, res, next) {
        if (req.user) {
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorized user!'
            });
        }
    }
}

module.exports = UserController;