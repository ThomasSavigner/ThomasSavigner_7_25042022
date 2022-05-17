
// imports
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const fs =require("fs");

const db = require("../models");
const User = db.Users;
  
//  Set up Global configuration access with isolated parameters
dotenv.config();


//          ****  Functions for CRUD operations on user model
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
}

exports.userLogin = (req, res) => {



    User.findOne( {where: { email: req.body.email } } )
        .then( (user) => {
            
            if (!user) {
                return res.status(403).send("Access denied, please sign-up first")
            };
            
            if (user.gotAdminAuthorization === false) {
                return res.status(403).send("Access denied, you've been banished from Groupospeak")
            }

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
                        token: jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '16h' })},
                    
                )})
                    
                .catch(error => res.status(500).json({ error }));

         })
}

exports.deleteUserAccount = (req, res) => {

    User.findOne( {where: {email: req.params['email']} } )
        .then( (user) => {

            if (user.userID !== req.auth.tokenUserId) {
                res.status(403).send("Unauthorized request !")
            } else {

                const filename = user.avatarUrl.split("/uploads/user-avatars/")[1]
				
				fs.unlink(`./uploads/user-avatars/${filename}`, () => {})
				
				User.destroy({where: {userID: req.auth.tokenUserId}})
					.then(() => res.status(200).send("User Deleted"))
					.catch((error) => res.status(500).send({error}))
            }
		})
		.catch((error) => res.status(500).send({error}))
}

exports.updateAvatar = (req, res) => {
   
    if (!req.file) {
        return res.status(403).send("Please, import an image from your device")
    }

    User.findOne(  { where: {email: req.params['email']} } )
        .then( (user) => { 
            if (user.userID !== req.auth.tokenUserId) {
                res.status(403).send("Unauthorized request !")
            } else {

            const filename = user.avatarUrl.split("/uploads/user-avatars/")[1]
            
            fs.unlink(`./uploads/user-avatars/${filename}`, () => {})
            
            user.avatarUrl =  `${req.protocol}://${req.get("host")}//uploads/user-avatars/${req.file.filename}`

            user.save()
                .then(res.status(200).send("Your avatar's been updated"))
                .catch((error) => res.status(500).send( {error : "Problem while saving new avatar, try again" } ))
            }
        })
        .catch((error) => res.status(500).send({error}))
}

exports.updatePassword = (req, res) => {
   
    if (!req.body.password && !req.body.passwordConfirm) {
        return res.status(403).send("Please, indicate and confirm your new password.")
    }

    User.findOne(  { where: {email: req.params['email']} } )
        .then( (user) => { 
            if (user.userID !== req.auth.tokenUserId) {
                res.status(403).send("Unauthorized request !")
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        user.password = hash;
                        user.save()
                            .then(res.status(200).send("Your password's been updated"))
                            .catch((error) => res.status(500).send( {error : "Problem while saving new password, try again" } ))
                    })   
            }
        })
        .catch((error) => res.status(500).send({error}))
}

exports.banishUser = (req, res) => {
    
    const amIAdmin = () => {
        
        User.findOne( {where: {userID: req.auth.tokenUserId} })
            .then( (admin) => {
                const boolAdmin = admin.isAdmin;
                return boolAdmin;
            })
            .catch((error) => res.status(500).send({error}))
    }

    User.findOne( {where: {email: req.params['email']} } )
        .then( (user) => {

            if (amIAdmin === false) {
                res.status(403).send("Unauthorized request !..: don't think about it")
            } else {
                if (user.gotAdminAuthorization === true) {
                    user.gotAdminAuthorization = false
                    console.log("user banished")
                } else {
                    user.gotAdminAuthorization = true
                    console.log("user is authorized")
                }
            };
    
            user.save()
                .then(res.status(200).send(user.firstName + (" ") + user.lastName + ("'s authorization modified")))
                .catch((error) => res.status(500).send( {error : "Problem while saving new user statut, try again" } ))
        })   
        .catch((error) => res.status(500).send({error}))
}
