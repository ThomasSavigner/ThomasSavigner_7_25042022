const db = require("./app/models");
const Post = db.Posts;
const Comment = db.Comments;
const faker = require('@faker-js/faker/locale/fr');


exports.createFakeComments = () => {
    
    for (i = 0; i < 150; i++) {

        
        /************* */
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        
        const rndInt2 = randomIntFromInterval(1276, 1360);
        //************* */
        Post.findOne( {where: {postID:rndInt2}} )
            .then((post)=>{
                let readersArray = post.readers;
                const userID =  readersArray[Math.floor(Math.random() * readersArray.length)];
                const myComment ={
                    userID: userID,
                    postID: rndInt2,
                    content: faker.lorem.paragraph(2),
                }

                Comment.create(myComment)
                    .then( (valid) => {
                        if (!valid) {
                            return console.log("Comment not valid")
                        }
                        console.log("comment saved in DB")
                    })
                    .catch( (err) =>{ console.log("Big Problem while saving to DB:" + err)})
            })
            .catch((err) => { console.log(err)})
    }
}