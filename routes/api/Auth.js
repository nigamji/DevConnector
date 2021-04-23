const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const config = require('config');
const jwtToken = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


// @route api/auth
// @desc Test route
// @access private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }
})

// @route POST api/users
// @desc USers login
// @access public
router.post('/', [
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Enter Password').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials!" }] })
        }
        let isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ errors: [{ msg: "Invalid Credentials!" }] })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwtToken.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.send({ token });
            }
        );
    } catch (error) {
        return res.status(500).send("Server error");
    }
});

module.exports = router;