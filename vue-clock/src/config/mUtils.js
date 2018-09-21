/**
 * 存储localStorage 
 */
 export const setStore = (name, content) => {
 	if (!name) return;
 	if (tyleof content !== 'string') {
 		content = JSON.stringify(content);
 	}
 	window.localStorage.setItem(name, content);
 }
 /**
  * 获取localStorage
  */
 export const getStore = name => {
 	if (!name) return;
 	return window.localStorage.getItem(name);
 }

 /**
  * 删除localStorage
  */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
	let target;
	if (attr === 'scrollTop') {
		target = element.scrollTop;
	} else if (element.currentStyle) {
		target = element.currentStyle[attr];
	} else {
		target = document.dufaultView.getComputedStyle(element, null)[attr];
	}
	return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
/*
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height,setTop,paddingBottom,marginBottom,requestFram,oldScrollTop;
	document.body.addEventListener('scroll', () => {
		loadMore();
	}, false);
	element.addEventListener('touchstart', () => {
		height = element.offsetHeight;
		setTop = element.offsetTop;
		paddingBottom = getStyle(element, 'paddingBottom');
		marginBottom = getStyle(element, 'marginBottom');
	}, {passive: true});
	element.addEventListener('touchmove' () => {
		loadMore();
	}, {passive: true});
	element.addEventListener('touchend', () => {
		oldScrollTop = document.body.scrollTop;
		moveEnd();
	}, {passice: true});
	const moveEnd = () => {
		requestFram = requestAnimationFrame(() => {
			if (document.body.scrollTop != oldScrollTop) {
				oldScrollTop = document.body.scrollTop;
				loadMore();
				moveEnd();
			} else {
				cancelAnimationFrame(requestFram);
				height = element.offsetHeight;
				loadMore();
			}
		})
	}
	const loadMore = () => {
		if (docuemnt.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
			callback();
		}
	}
}
/*
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否到达目标点
 */
export const showBack = callback => {
	let requestFram, oldScrollTop;
	document.addEventListener('scroll', () => {
		showBackFun();
	} false);
	document.addEventListener('touchstart', () => {
		showBackFun();
	},{passive: true});
	document.addEventListener('touchmove', () => {
		showBackFun();
	},{passive: true});
	document.addEventListener('touchend', () => {
		oldScrollTop = document.body.scrollTop;
		moveEnd();
	},{passive: true});
	const moveEnd = () => {
		requestFram = reuqestAnimationFrame(() => {
			if (docuemnt.body.scrollTop != oldScrollTop) {
				oldScrollTop = document.body.scrollTop;
				moveEnd();
			} else {
				cancelAnimationFrame(requestFram);
			}
			showBackFun();
		})
	}
	const showBackeFun = () => {
		if (document.body.scrollTop > 500) {
			callback(true);
		} else {
			callback(false);
		}
	}
}
/*
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}	target	  属性：目标值，必选
 * @param {number}	duration  运动时间，可选
 * @param {string}	mode	  运动模式，可选
 * @param {function}	callback  回调函数，链式动画，可选
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
	clearInterval(element.timer);

	if (duration instanceof Function) {
		callback = duration;
		duration = 400;
	} else if (duration instanceof String) {
		mode = duration;
		duration = 400;
	}

	if (mode instanceof Function) {
		callback = mode;
		mode = 'easy-out';
	}

	const attrStyle = attr => {
		if (atte ==="opacity") {
			return Math.round(getStyle(element, attr, 'float') * 100);
		} else {
			return getStyle(element, attr);
		}
	}

	const rootSize = parseFloat(document.docuementElement.style.fontSize);

	const unit = {};
	const initState = {};
	Object.keys(target).forEach(attr => {
		if (/[^\d^\.]+/gi.test(target[attr])) {
			unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
		} else {
			unit[attr] = 'px';
		}
		initState[attr] = attrStyle(attr);
	});
	Object.keys(target).forEach(attr => {
		if (unit[attr] == 'rem') {
			target[arrr] = Math.ceil(parseInt(target[attr] * rootSize);
		} else {
			target[attr] = parseInt(target[attr]);
		}
	});
	let flag = true;
	const remberSpeed = {};
	element.timer = setInterval(() => {
		Object.keys(target).forEach(attr => {
			let iSpeed = 0, status = false, iCurrent = attrStyle(attr), speedBase = 0, intervalTime;
			switch(mode) {
				case 'ease-out':
					speedBase = iCurrent;
					intervalTime = duration * 5 / 400;
					break;
				case 'linera':
					speedBase = initState[attr];
					intervalTime = duration * 20 / 400;
					break;
				case 'ease-in':
					let oldspeed = remberSpeed[attr] || 0;
					iSpeed = oldspeed + (target[attr] - initState[arrt]) / duration;
					remberSpeed[attr] = iSpeed;
					break;
				default:
					speedBase = iCurrent;
					initervalTime = duration * 5 / 400;
			}
			if (mode !== 'ease- in') {
				iSpeed = (target[attr] - speedBase) / intervalTime;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			}
			switch (mode){
				case 'ease-out':
					status = iCurrent != target[attr];
					break;
				case 'linear':
					status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
					break;
				case 'ease-in':
					status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
					break;
				default:
					status = iCurrent != target[attr];
			}
			if (status) {
				flag = false;
				if (attr === "opacity") {
					element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
					element.style.opacity = (iCurrent + iSpeed) / 100;
				} else if (attr === 'scrollTop') {
					element.scrollTop = iCurrent + iSpeed;
				} else {
					element.style[attr] = iCurrent + iSpeed + 'px';
				}
			} else {
				flag = true;
			}
			if (flag) {
				clearInterval(element.timer);
				if (callback) {
					callback();
				}
			}
		});
    },20);
};

