const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware/auth");
const postService = require("../services/postService");


router.post("/post",isLoggedIn,async (req,res)=>{
    await postService.newPost({email:req.user.email,content:req.body.content});
    res.redirect("/profile");
})


router.get("/edit/:id",isLoggedIn,async (req,res)=>{
    const post = await postService.edit({id:req.params.id});
    res.render("edit",{post});
})

router.post("/update/:id",isLoggedIn,async (req,res)=>{
    await postService.update({id:req.params.id,content:req.body.content});
    res.redirect("/profile");
})

router.post("/like/:id",isLoggedIn,async (req,res)=>{
    await postService.like({postid:req.params.id,userid:req.user.userid});
    res.redirect("/profile");
})


module.exports = router;