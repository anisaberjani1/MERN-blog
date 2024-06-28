import { Op } from "sequelize";
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

export const likeComment = async (req, res, next) => {
    try {
      const comment = await Comment.findByPk(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, 'Comment not found'));
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
  
    } catch (error) {
      next(error);
    }
  };

export const editComment = async(req,res,next) => {
    try{
        const comment = await Comment.findByPk(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'Comment not found!'));
        }
        
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, 'You are not allowed to edit this comment'));
        }

        const [rowsUpdated, updatedComments] = await Comment.update(
            {content: req.body.content},
            {
                where: {id: req.params.commentId},
                returning: true
            }
        );
        const editedComment = updatedComments[0];

        res.status(200).json(editedComment)

    }catch(error){
        next(error);
    }
}

export const deleteComment = async(req,res,next) => {
    try{
        const comment = await Comment.findByPk(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,'Comment not found!'));
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403,'You are not allowed to delete this comment'));
        }
        await comment.destroy();
        
        res.status(200).json('Comment has been deleted');

    }catch(error){
        next(error);
    }
}

export const getComments = async(req,res,next) => {
    if(!req.user.isAdmin) 
        return next(errorHandler(403,'You are not allowed to get commments'))
    
    try{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? 'DESC' : 'ASC';

        const comments = await Comment.findAll({
            order: [['createdAt', sortDirection]],
            offset: startIndex,
            limit: limit
        })
            
        
        const totalComments = await Comment.count();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const lastMonthComments = await Comment.count({
            where: {
                createdAt: {
                    [Op.gte]: oneMonthAgo,
                },
            },
        });

        res.status(200).json({comments, totalComments, lastMonthComments});

    }catch(error){
        next(error);
    }
}