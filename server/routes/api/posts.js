const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();



//Get all posts - the slash represents '/api/posts' in index file.
router.get('/', async (req, res) => {
        const posts = await loadPostsCollection();
        res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', async  (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        test: req.body.text,
        createdAt: new Date(),

    });
    res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectId(req.params.id)
    });
    res.status(200).send();
});


//Load the posts
async function loadPostsCollection() {

    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://og-user-001:Admin@vue-express-cluster-ie93z.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true
        });

    return  client.db('vue-express-cluster').collection('posts');
}



// //Get single member
// router.get('/:id', (req,res) => {
//
//     const found = posts.some(member => member.id === (parseInt(req.params.id)));
//
//     if(found){
//         res.json(posts.filter(member => member.id === (parseInt(req.params.id))));
//     } else {
//         res.status(400).json({msg: `Member ${req.params.id} not found`});
//     }
//
// });
//
// //Create Member
// router.post('/', (req, res) => {
//     const newMember = {
//
//     };
// });

module.exports = router;