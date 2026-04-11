const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const authService = require("../services/authService");

router.get("/",(req,res)=>{
    res.render("index");
});

router.post("/register",async (req,res)=>{
    let {username ,name , age , email , password} = req.body;
    const token = await authService.register({username ,name , age , email , password});
    if (token){
        res.cookie("token",token);
        res.redirect("/profile")
    }else{
        res.redirect("/");
    }
});

router.post("/login",async (req,res)=>{
    const token = await authService.login({email:req.body.email,password:req.body.password});
    if (token){
        res.cookie("token",token);
        res.redirect("/profile")
    }else{
    res.redirect("/login");
    }
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/login");
});

router.get("/profile",isLoggedIn,async (req,res)=>{
   const user = await authService.populateProfile(req.user.email);
    res.render("profile",{user});
})

module.exports = router;