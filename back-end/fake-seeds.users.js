const db = require("./app/models");
const User = db.Users;

const bcrypt = require('bcrypt');
const faker = require('@faker-js/faker/locale/fr');
const fs = require('fs');
const https = require('https');

 

exports.createFakeUsers = () => {

    for (i = 0; i < 50; i++) {

        // URL of the image
        const url = faker.image.avatar();
        const fileName = url.replace(/^.*[\\\/]/, '');
        const newFileName = 'avatar_' + fileName.slice(0, -4) + "_" + Date.now() + '.jpg';

        https.get(url, (res) => {
            // Image will be stored at this path
            const path = `${__dirname}/uploads/user-avatars/${newFileName}`;
            const filePath = fs.createWriteStream(path);

            res.pipe(filePath);
            filePath.on('finish', () => {
                filePath.close();
                console.log('Download Completed');
            });
        });

        //************* */
        let avatarUrl = `http://localhost:4039//uploads/user-avatars/${newFileName}`;
        //************* */
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const rndInt = randomIntFromInterval(2, 6);
        //*************** */
        const oneFirstName = faker.name.firstName();
        const oneLastName = faker.name.lastName();

        const firstLetter = oneFirstName[0];
        const mail = firstLetter.toLowerCase() + oneLastName.toLowerCase() + '@groupomania.fr';
        //*************** */
        const pwd = `LmEaHy4h67[gs]+`; //faker.internet.password(12, false, /.*/);
        
        const hash = bcrypt.hashSync(pwd, 10);

        const fakeUser = {
            firstName: oneFirstName,
            lastName: oneLastName,
            avatarUrl: avatarUrl,
            departmentID: rndInt,
            email: mail,
            password: hash,
            loggedInAt: Date.now(),
        };
        console.log(fakeUser);

        User.create(fakeUser)
            .then((valid) => {
                if (!valid) {
                    return res.status(500).send("Technical error, try again");
                }
                //response.status(200).send
                console.log("User account created");
            })
            .catch(() => console.log("Problem: user already exist in database"));
    };
}
