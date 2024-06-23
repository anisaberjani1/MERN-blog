import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req,res,next) => {
    try{
        const {content, postId, userId} = req.body;

        if(userId !== req.user.id){
            return next(errorHandler(403,'You are not allowed to create this comment'));
        }

        const newComment = await Comment.create({
            content,
            postId,
            userId,
        });
        
        res.status(200).json(newComment);

    }catch(error){
        next(error);
    }
}

export const getPostComments = async (req,res,next) => {
    try{
        const comments = await Comment.findAll({
            where: {postId: req.params.postId},
            order: [['createdAt', 'DESC']],
        })

        res.status(200).json(comments)
    }catch(error){
        next(error);
    }
}

export const likeComment = async(req,res,next) => {
    try{
        const comment = await Comment.findByPk(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,'Comment not found'));
        }

        const userIndex = comment.likes.indexOf(req.user.id);

        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id); 

        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1); 
        }

        await comment.save();

        res.status(200).json(comment);

    }catch(error){
        next(error);
    }
}