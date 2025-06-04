function getUser(userId, callback) {

  setTimeout(() => {

    const users = {

      1: { name: 'Alice', id: 1 },

      2: { name: 'Bob', id: 2 }

    };

    const user = users[userId];

    if (user) {

      console.log(`User found: ${user.name}`);

      callback(null, user);

    } else {

      callback('User not found', null);

    }

  }, 500);

}
 
function getUserPosts(userId, callback) {

  setTimeout(() => {

    const posts = {

      1: [{ postId: 101, title: 'My first post' }, { postId: 102, title: 'Travel photos' }],

      2: [{ postId: 201, title: 'Cooking tips' }]

    };

    const userPosts = posts[userId];

    if (userPosts) {

      console.log(`Posts for user ${userId} found.`);

      callback(null, userPosts);

    } else {

      callback('No posts found for this user', null);

    }

  }, 700);

}
 
function getPostComments(postId, callback) {

  setTimeout(() => {

    const comments = {

      101: [{ commentId: 1, text: 'Great post!' }, { commentId: 2, text: 'Very insightful.' }],

      102: [{ commentId: 3, text: 'Amazing pictures!' }],

      201: [{ commentId: 4, text: 'Tried your recipe, it was delicious!' }]

    };

    const postComments = comments[postId];

    if (postComments) {

      console.log(`Comments for post ${postId} found.`);

      callback(null, postComments);

    } else {

      callback('No comments found for this post', null);

    }

  }, 600);

}
 

module.exports = {
  getUser,
  getUserPosts,
  getPostComments
};
 