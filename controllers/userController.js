var mongose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    auth_settings = require('../auth_settings.json'),
    bcrypt = require('bcrypt'),
    AppUser = require('../models/app_user');
class UserController {
    constructor() {

    }

    register(req, res) {
        let newUser = new AppUser(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        newUser.save((err, user) => {
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
            email: req.body.email
        }).then((user, err)=>{
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
                return res.json({
                    token: jwt.sign({
                        email: user.email,
                        fullName: user.fullName,
                        _id: user._id
                    }, auth_settings.secret)
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