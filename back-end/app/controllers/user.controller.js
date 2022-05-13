
// imports
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const db = require("../models");
const User = db.Users;
  
// Set up Global configuration access
dotenv.config();


//              ****  Functions for CRUD operations on user model

exports.userSignup = (req, res) => {

    //content of request validation
    if (!req.body.firstName || !req.body.lastName || !req.body.departmentID || !req.body.email || 
        !req.body.password || !req.body.passwordConfirm) {
		return res.status(403).send("Sign-Up incomplete: all fields (except avatar file) are required")
	}


	let avatarUrl = `${req.protocol}://${req.get("host")}/uploads/user-avatars/default-avatar.png`;
	if (req.file) {
		avatarUrl = `${req.protocol}://${req.get("host")}//uploads/user-avatars/${req.file.filename}`
	}

	// crypt password
	bcrypt.hash(req.body.password, 10)
        .then( hash => {
    		const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                departmentID: req.body.departmentID,
                email: req.body.email,
                password: hash,
                avatarUrl: avatarUrl,
                gotAdminAuthorization: true,
                isAdmin: false,
            };

            User.create(user)
                .then((valid) => {
                    if (!valid) {
                        return res.status(500).send("Technical error, try again")
                    }
                    res.status(200).send("User account created")
                })
                .catch(() => res.status(403).send("Problem: user already exist in database"))
        })
};

exports.userLogin = (req, res) => {

    User.findOne( {where: { email: req.body.email } } )
        .then( (user) => {
            
            if (!user) {
                return res.status(403).send("Access denied, please sign-up first")
            };
            
            bcrypt.compare(req.body.password, user.password)
                .then( (valid) => {

                    if (!valid) {
                        return res.status(401).json({ error: 'Invalid password !' });
                    }

                    let data = {
                        time: Date(),
                        userId: user.userID,
                    }

                    res.status(200).send({
                        statut: "Logged in user",
                        //  token generation
                        token: jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '16h' }),
                    })

                } )
                .catch(error => res.status(500).json({ error }));

        } )
};
    




