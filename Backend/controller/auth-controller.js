// ------------- Signin --------------

const User = require("../models/User");

let userAuthCheck;
const login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        // console.log("USER: ", user);
        if (user) {
            res.send(user);
            userAuthCheck = user;
        } else {
            res.status(401).send("Invalid Credentials");
            userAuthCheck = null;
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

// Getting User Details of login user
const getLogin = (req, res) => {
    res.send(userAuthCheck);
};
// ------------------------------------



// Registration API

// hash the password


const registerUser = (req, res) => {
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(req.body.password,saltRound)
    let registerUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        imageUrl: req.body.imageUrl,
    });

    registerUser
        .save()
        .then((result) => {
            res.status(200).send(result);
            alert("Signup Successfull");
        })
        .catch((err) => console.log("Signup: ", err));
    console.log("request: ", req.body);
};
module.exports = {
    login,
    registerUser,
    getLogin,
}

