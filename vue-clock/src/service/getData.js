import fetch from '../config/fetch'
/**
 * 检测账号是否存在
 */
export const checkExsis = (checkNumber,type) => fetch('/exists',{[tyle]:checkNumber, type});
export const sendMobile = (v = '') => {return ''}
export const getcaptchas = (v = '') => {return ''}
export const changePassword = (v = '') => {return ''}
