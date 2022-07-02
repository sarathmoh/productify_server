const  router = require('express').Router();
const User = require('../model/User')
const md5 = require('md5')
const { registerValidation, loginValidation, addProductValidation, updateProductValidation } = require('../validation')
const jwt=require('jsonwebtoken');









//regsitration route
router.post('/registration',(req,res) => {
    const { error } = registerValidation(req.body)
    if (error) {
        res.send(error.details[0].message);
    }
    else {
        User.findOne({ email: req.body.email }, (error, foundUser) => {
            if (foundUser) {
                res.status(200).send("user already exists");
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: md5(req.body.password),
                    place: req.body.place
                })
                newUser.save();
                res.status(201).send("successfully registered")
            }
        })
    }
})

//login route
router.post('/login',(req,res)=>{
    const { error } = loginValidation(req.body)

    if (error) { 
        res.send(error.details[0].message);
    }
    else {

        User.findOne({ email: req.body.email }, (error, foundUser) => {
            if (error) {
                res.send(error)
            }
            else {
                if (foundUser) {
                    if (foundUser.password === md5(req.body.password)) {
                    
                        // creating token
                        const userId={
                        id:foundUser.id};
                        const token=jwt.sign(userId,process.env.TOKEN_SECRET)
                        res.status(201).send(token);}
                        
                    else {
                        res.status(200).send("Invalid password")
                    }
                }
                else {
                    res.status(200).send("User doenot exist ")
                }
            }
        })
    }
})


module.exports = router;