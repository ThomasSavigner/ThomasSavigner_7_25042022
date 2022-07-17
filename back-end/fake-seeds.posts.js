const db = require("./app/models");
const Post = db.Posts;
const faker = require('@faker-js/faker/locale/fr');
const fs = require('fs');
 const path = require('path');

exports.createFakePosts= () => {
    
    for (i = 0; i < 85; i++) {

        /**************** */
        const sourceDirImages = 'D:/data/OpenClassrooms/P7/photos/backend/postphotos/'
        const targetDirImages = 'D:/data/Git/ThomasSavigner_7_25042022/back-end/uploads/post-images/'
        const files = fs.readdirSync(sourceDirImages);
        let choosedFile= files[Math.floor(Math.random() *files.length)]

        const newFileName = 'post_' + choosedFile.slice(0, -4) + "_" + Date.now() + '.jpg';

        const source = sourceDirImages+choosedFile;
        const target = targetDirImages+newFileName

        fs.copyFileSync( source, target );        
        //************* */
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const rndInt = randomIntFromInterval(301, 450);
        //************* */
        const stringHashtags = `#${faker.random.word()} #${faker.random.word()} #${faker.random.word()}`;
        //************* */
        const postTopic =  faker.lorem.sentence();
        //************* */
        const postArticle = faker.lorem.paragraphs(5);
        //************* */
        const imagePath = 'http://localhost:4039/uploads/post-images/' + newFileName;
        //************* */
        const readingsNumber = randomIntFromInterval(1, 60);
        
        let usersArray = [];
        for (y= 301; y < 450; y++) {
            usersArray.push(y);
        }
        let readersArray = usersArray.sort(() => Math.random() - Math.random()).slice(0, readingsNumber)
        //******** */
        const likesNumber = randomIntFromInterval(1, readingsNumber);
        
        let likersArray = readersArray.sort(() => Math.random() - Math.random()).slice(0, likesNumber)
        
        const myPost = {
            userID: rndInt,
            hashtags: stringHashtags,
            topic: postTopic,
            article: postArticle,
            imageUrl: imagePath,
            readings: readingsNumber,
            readers: readersArray,
            likes: likesNumber,
            likers: likersArray,
        };

        Post.create(myPost)
            .then((valid) => {
                if (!valid) {
                    return console.log("Technical error, try again");
                }
                
                console.log("Post uploaded to DB");
                
            })
            .catch((err) => console.log("Problem while creating instance in DB table" + err));
    
        }
}