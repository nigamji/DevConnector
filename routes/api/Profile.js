const express = require('express');
const router = express.Router();
const config = require('config')
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const request = require('request');
const { response } = require('express');
// @route api/profile/me
// @desc Get current users profile
// @access private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: "profile not found" });
        }
        res.json(profile);
    } catch (error) {
        return res.status(500).send('Server Error');
    }
});
// @route api/profile/
// @desc Create or update profile
// @access private
router.post('/', [auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ err: errors.array() })
    }
    const {
        company,
        website,
        bio,
        location,
        status,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        githubusername
    } = req.body;
    let profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());
    if (githubusername) profileFields.githubusername = githubusername;
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        //update
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )
            return (res.json(profile));
        }
        //create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }
})
// @route GET api/profile/
// @desc get all profile
// @access public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message)
        res.json(500).send('Server Error');
    }
})
// @route GET api/profile/user/:user_id
// @desc get profile by user id
// @access public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        console.error(error.message)
        res.json(500).send('Server Error');
    }
})
// @route Delete api/profile/
// @desc delete profile, user & posts
// @access private
router.delete('/', auth, async (req, res) => {
    try {
        await Post.deleteMany({ user: req.user.id })
        await Profile.findOneAndRemove({ user: req.user.id })
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: 'Profile & User deleted' });
    } catch (error) {
        console.error(error.message)
        res.json(500).send('Server Error');
    }
})
// @route Put api/profile/experience
// @desc  add experience in profile
// @access private
router.put('/experience', [auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ err: errors.array() })
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile)
    } catch (error) {
        console.error(error.message());
        res.status(500).send("Server error");
    }

})
// @route Delete api/experience/:exp_id
// @desc  delete experience in profile
// @access private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id });
    //find remove index
    const removeIndex = profile.experience.map(result => result.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
})
// @route Put api/profile/education
// @desc  add education in profile
// @access private
router.put('/education', [auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field Of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ err: errors.array() })
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile)
    } catch (error) {
        console.error(error.message());
        res.status(500).send("Server error");
    }

})
// @route Delete api/education/:edu_id
// @desc  delete education in profile
// @access private
router.delete('/education/:edu_id', auth, async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id });
    //find remove index
    const removeIndex = profile.education.map(result => result.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
})

// @route GET api/profile/github/user/:username
// @desc  get users repo from github
// @access public
router.get('/github/user/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&
                  client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        await request(options, (error, response, body) => {
            if (error) console.error('Here?   ' + error.message())

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Profile found!' });
            }

            res.json(JSON.parse(body));
        })
    } catch (error) {
        console.error(error.message())
    }
})

module.exports = router;