'use strict'
import User from '../controller/v2/user'
import express from 'express';
const router = express.Router();
router.post('/login', User.login);//登录&&注册
router.get('/signout', User.signout);//登出
router.post('/changepassword', User.chanegPassword);//修改密码
router.get('/user', User.getInfo);

export default router;