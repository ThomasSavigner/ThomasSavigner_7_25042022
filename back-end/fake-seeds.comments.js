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
        //const rndInt1 = randomIntFromInterval(442, 491);
        const rndInt2 = randomIntFromInterval(1907, 1931);
        //************* */
        Post.findOne( {where: {postID:rndInt2}} )
            .then((post)=>{
                let readersArray = JSON.parse(post.readers)
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
    }
}