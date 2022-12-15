
require('dotenv').config()

const User = require('../../resources/models/User');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const UserController = {

    // [POST] /api/auth/register
    // @desc Register User
    // @access public
    register: async function (req, res) {
        const { username, password } = req.body;

        // If missing user or password
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Missing username or password' });
        }

        try {
            const user = await User.findOne({ username });

            // If have user
            if (user) {
                return res.status(400).json({success: false, message: 'Username already taken'});
            }

            // All good
            const hashPassword = await argon2.hash(password)

            const newUser = await User({
                username,
                password: hashPassword
            })
            await newUser.save()

            // Access Token
            const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

            res.json({success: true, message: 'User register successfully', accessToken})
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // [POST] /api/auth/login
    // @desc Login User
    // @access public
    login: async function (req, res) {
        const {username, password} = req.body

        // If missing username or password
        if (!username || !password) {
            return res.status(400).json({success: false, message: 'Missing username or password'})
        }

        try {
            const user = await User.findOne({username})
            // If wrong username or password
            if (!user) {
                return res.status(400).json({success: false, message: 'Wrong username or password'})
            }

            const passwordValid = await argon2.verify(user.password, password)

            if (!passwordValid) {
                return res.status(400).json({success: false, message: 'Wrong username or password'})
            }

            // Access Token
            const accessToken = jwt.sign({userId: user._id}, password)

            res.json({success: true, message: 'Login successfully', accessToken})

        } catch (err) {
            console.log(err)
            res.status(500).json({success: false, message: 'Internal server error'})
        }

    }
};

module.exports = UserController;
