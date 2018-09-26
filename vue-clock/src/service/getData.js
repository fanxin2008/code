import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
/**
 * 检测账号是否存在
 */
export const changePassword = (username, oldpassword, newpassword, confirmpassword) => fetch('/user/changepassword', {username, oldpassword, newpassword,confirmpassword}, 'POST');
export const signout = (username, password) => fetch('/user/signout');
export const accountLogin = (username, password) => fetch('/user/login', {username, password}, 'POST');
export const getUser = () => fetch('/user/user', {user_id: getStore('user_id')});