const userModel = require("../models/user");
const postModel = require("../models/post");


    async function newPost({email,content}){
    let user = await userModel.findOne({email});

    let post = await postModel.create({
        user: user._id,
        content
    });

    user.posts.push(post._id);
    await user.save();
    }

    async function edit({id}){
        let post = await postModel.findOne({_id:id});
        return post;
  
    }

    async function update({id,content}){
        await postModel.findOneAndUpdate({_id:id},{content:content});
    }

    async function like({postid,userid}){
        let post = await postModel.findOne({_id:postid}).populate("user");

        if(post.likes.indexOf(userid)===-1){
        post.likes.push(userid);
        }
        else{
        post.likes.splice(post.likes.indexOf(userid),1)
        }
        await post.save();
    }

module.exports = {
    newPost,
    edit,
    update,
    like
};