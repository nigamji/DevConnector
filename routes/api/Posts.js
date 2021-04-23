const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
// const Profile = require('../../models/Profile')
const Post = require('../../models/Post')
const User = require('../../models/User')
const auth = require('../../middleware/auth');

// @route Post api/posts
// @desc  Create post
// @access private
router.post('/', [auth,
    check('text', 'Text is required').not().isEmpty()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json(error.message())
    }
    try {
        const user = await User.findById(req.user.id);
        const newPost = new Post({
            user: user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        });

        const post = await newPost.save();
        res.json(post);
    }
    catch (error) {
        console.error(error.message());
        res.status(500).send('Server error')
    }
});

// @route GET api/posts
// @desc  Get all post
// @access private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts);
    } catch (error) {
        console.error(error.message());
        res.status(500).send('Server error')
    }
})

// @route GET api/posts/:id
// @desc  Get post by id
// @access private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) res.status('404').json({ msg: 'Post not found' });
        res.json(post);
    } catch (error) {
        if (error.kind == 'ObjectId') {
            res.status('404').json({ msg: 'Post not found' });
        }
        console.error(error.message());
        res.status(500).send('Server error')
    }
})
// @route DELETE api/posts/:id
// @desc  delete post by id
// @access private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User unauthorized!' })
        }

        await post.remove();
        res.json({ msg: "Post removed" })
    } catch (error) {
        if (error.kind == 'ObjectId') {
            res.status(404).json({ msg: 'Post not found' });
        }
        console.error(error.message());
        res.status(500).send('Server error')
    }
})
// @route PUT api/posts/like/:id
// @desc  Like a post
// @access private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() == req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' })
        }
        post.likes.unshift({ user: req.user.id })
        await post.save();
        res.json(post.likes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})
// @route PUT api/posts/unlike/:id
// @desc  Unlike a post
// @access private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() == req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post not liked yet' })
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})
// @route PUT api/posts/comment/:id
// @desc  Comment a post
// @access private
router.put('/comment/:id', [auth,
    check('text', 'Text is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const text = req.body.text;
        const newComment = {
            user: user.id,
            text,
            name: user.name,
            avatar: user.avatar

        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})
// @route Delete api/posts/comment/:id/:commment_id
// @desc  Delete comment from a post
// @access private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id.toString() == req.params.comment_id)

        if (!comment) {
            res.status(404).json({ msg: 'Comment does not exist!' })
        }
        if (comment.user.toString() != req.user.id) {
            res.status(401).json({ msg: 'Access Denied, Unauthorized User' })
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error');
    }
})
module.exports = router;