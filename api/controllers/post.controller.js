import { Op } from "sequelize";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to create a post'))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please provide all required fields'))
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });

    try{
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(error){
        next(error);
    }
};

export const getposts = async ( req,res, next) => {
    try{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;

        const sortDirection = req.query.order === 'asc' ? 'ASC' : 'DESC';

        const where = {
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {slug: req.query.slug}),
            ...(req.query.postId && {id: req.query.postId}),
            ...(req.query.searchTerm && {
                [Op.or]: [
                    {title: {[Op.iLike]: `%${req.query.searchTerm}%`}},
                    {content: {[Op.iLike]: `%${req.query.searchTerm}%`}},
                ],
            })
        };

        const posts = await Post.findAll({
            where,
            order: [['updatedAt', sortDirection]],
            offset: startIndex,
            limit
        });

        const totalPosts = await Post.count();
        
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );

        const lastMonthPosts = await Post.count({
            where: {
                createdAt: {
                    [Op.gte]: oneMonthAgo
                },
            },
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });

    }catch(error){
        next(error);
    }
}

export const deletepost = async (req, res, next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to delete this post'));
    }
    
    try{
        const post = await Post.findOne({where: {id: req.params.postId}});
        if(!post){
            return next(errorHandler(404,'Post not found'));            
        }
        await post.destroy();
        res.status(200).json('The post has been deleted');

    }catch(error){
        next(error);
    }
}