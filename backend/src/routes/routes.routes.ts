// import { PermissionMiddleware } from './../middleware/permission.middleware';
import {
	DislikePost,
	LikePost,
	reportPost,
} from './../controllers/post.controller';
import {
	CreateUSerComment,
	DeleteComment,
	GetComment,
	getComments,
	UpdateComment,
} from './../controllers/comment.controller';
import { Upload } from './../controllers/image.controller';

import express from 'express';
import {
	Users,
	CreateUser,
	GetUser,
	UpdateUser,
	DeleteUser,
	ExportUser,
	BlockUser,
	UnBlockUser,
} from './../controllers/user.controller';
import { AuthMiddleware } from './../middleware/auth.middleware';
import {
	Register,
	Login,
	AuthenticatedUser,
	Logout,
	UpdateInfo,
	UpdatePassword,
} from './../controllers/auth.controller';
import { Request, Router } from 'express';
import { Forgot, ResetPassword } from '../controllers/forgot.controller';
import { Permissions } from '../controllers/permission.controller';
import {
	CreatePost,
	CreatePostUser,
	DeletePost,
	GetPost,
	Posts,
	UpdatePost,
} from '../controllers/post.controller';
import { CreateCommentPost } from '../controllers/comment.controller';

export const routes = (router: Router) => {
	// Authenticated user
	router.post('/api/register', Register);
	router.post('/api/login', Login);
	router.get('/api/user', AuthMiddleware, AuthenticatedUser);
	router.post('/api/logout', AuthMiddleware, Logout);
	router.put('/api/users/info', AuthMiddleware, UpdateInfo);
	router.put('/api/users/password', AuthMiddleware, UpdatePassword);
	// Forgot password
	router.post('/api/forgot', Forgot);
	router.post('/api/reset', ResetPassword);

	// All other Users
	router.get('/api/users', AuthMiddleware, Users); // A mettre a la fin PermissionMiddleware('roles'),
	router.post('/api/users', AuthMiddleware, CreateUser);
	router.get('/api/users/:id', AuthMiddleware, GetUser);
	router.put('/api/users/:id', AuthMiddleware, UpdateUser);
	router.put('/api/users/:id/block', AuthMiddleware, BlockUser);
	router.put('/api/users/:id/validate', AuthMiddleware, UnBlockUser);
	router.delete('/api/users/:id', AuthMiddleware, DeleteUser);

	// Export csv des utilisateurs
	router.post('/api/export', AuthMiddleware, ExportUser);

	// Post routes
	router.get('/api/posts', AuthMiddleware, Posts);
	router.post('/api/users/:id/post', AuthMiddleware, CreatePostUser);
	router.post('/api/users/:id/comment', AuthMiddleware, CreateUSerComment);
	router.post('/api/posts', AuthMiddleware, CreatePost);
	router.get('/api/post/:id', AuthMiddleware, GetPost);
	router.put('/api/post/:id', AuthMiddleware, UpdatePost);
	router.delete('/api/post/:id', AuthMiddleware, DeletePost);
	router.put('/api/post/:id/report', AuthMiddleware, reportPost);
	// On like un post
	router.put('/api/post/:id/like', AuthMiddleware, LikePost);
	// On dislike un post
	router.put('/api/post/:id/dislike', AuthMiddleware, DislikePost);
	// Comment routes
	router.get('/api/comments', AuthMiddleware, getComments);
	router.post('/api/posts/:id/comment', AuthMiddleware, CreateCommentPost);
	router.get('/api/comments/:id', AuthMiddleware, GetComment);
	router.put('/api/comments/:id', AuthMiddleware, UpdateComment);
	router.delete('/api/comments/:id', AuthMiddleware, DeleteComment);

	//Images Upload
	router.post('/api/upload', AuthMiddleware, Upload);
	// Route statique pour les Images
	router.use('/api/uploads', express.static('./uploads'));
};
