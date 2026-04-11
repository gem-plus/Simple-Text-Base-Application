const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

async function register({username ,name , age , email , password}){
        let user = await userModel.findOne({email});
        if (user) return null;
    
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let newUser = await userModel.create({
            name,
            username,
            age,
            email,
            password : hash
        })
    
        let token = jwt.sign({
                email:email,
                userid:newUser._id
        }, jwtSecret,{expiresIn:"1h"});

        return token;
        
}
async function login({email , password}){
        let user = await userModel.findOne({email});
        if (!user) return null;
    
         const match = await bcrypt.compare(password,user.password);
        if (!match) return null;

        let token = jwt.sign({
                email:email,
                userid:user._id
        }, jwtSecret,{expiresIn:"1h"});

        return token;
    
}

async function populateProfile(email){
        let user = await userModel.findOne({email: email}).populate("posts");
        return user;
    
}

module.exports = {
    register,
    login,
    populateProfile
}