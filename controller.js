const express = require('express');
const router = express.Router();
const service = require('./service');

router.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  
  service.getUser(userId, (error, user) => {
    if (error) {
      return res.status(404).json({ error: error });
    }
    res.json(user);
  });
});

router.get('/users/:userId/posts', (req, res) => {
  const userId = parseInt(req.params.userId);
  
  service.getUserPosts(userId, (error, posts) => {
    if (error) {
      return res.status(404).json({ error: error });
    }
    res.json(posts);
  });
});

router.get('/posts/:postId/comments', (req, res) => {
  const postId = parseInt(req.params.postId);
  
  service.getPostComments(postId, (error, comments) => {
    if (error) {
      return res.status(404).json({ error: error });
    }
    res.json(comments);
  });
});


router.get('/users/:userId/full', (req, res) => {
  const userId = parseInt(req.params.userId);
  
  service.getUser(userId, (userError, user) => {
    if (userError) {
      return res.status(404).json({ error: userError });
    }
    
    service.getUserPosts(user.id, (postsError, posts) => {
      if (postsError) {
        return res.status(404).json({ error: postsError });
      }
      
      if (posts.length > 0) {
        service.getPostComments(posts[0].postId, (commentsError, comments) => {
          if (commentsError) {
            return res.status(404).json({ error: commentsError });
          }
          
          res.json({
            user,
            posts,
            commentsOnFirstPost: comments
          });
        });
      } else {
        res.json({
          user,
          posts,
          commentsOnFirstPost: []
        });
      }
    });
  });
});

module.exports = router;
