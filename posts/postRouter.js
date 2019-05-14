const express = require('express');
const Posts = require('./postDb.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const posts = await Posts.get();
        res.status(200).json(posts);
    }catch(error) {
        res.status(500).json({
            message: "posts could not be retrieved"
        })
    }

});

router.get('/:id', async(req, res) => {
try{
    const post = await Posts.getById(req.params.id);
    if(post) {
        res.status(200).json(post);

    }else{
        res.status(404),json({message: 'post not found'});
    }

}catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  }
});

router.delete('/:id', async(req, res) => {
try{
    const postId = await Posts.remove(req.params.id);
    if (postId) {
        res.status(200).json({message: 'post has been deleted'});
    } else {
        res.status(404).json({message: 'post is not found'});
    }
}
catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

router.put('/:id', validatePost, async(req, res) => {
    try{
        const post = await Posts.update(req.params.id, req.body);
        if(post){
            res.status(200).json(post);

        }else{
            res.status(404).json({message: 'post is not found'});
        }
    }catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error updating the post',
        });
      }
});

// custom middleware

function validatePost(req, res, next) {
    if(req.body && Object.keys(req.body).length){
        next();
    }else{
        res.status(404).json({message: 'please include req body'});
    }

};

module.exports = router;