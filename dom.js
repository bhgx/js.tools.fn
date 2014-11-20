/*
 * dom节点操作 
 */
var dom = {
	/*
	 * 选择元素 
	 * @param: selector -> 选择器字符串
	 * @param: node -> html节点
	 */
	$: function(selector, node) {
		var tagAll, tags = [],
			type = selector.charAt(0),
			subSlector = selector.substring(1),
			node = node || document;
		if (typeof(selector) === 'string') {
			switch (type) {
				case '#':
					return document.getElementById(subSlector);
					break;
				case '.':
					if (node.getElementsByClassName) {
						return node.getElementsByClassName(subSlector);
					} else {
						tagAll = dom.$('*', node);
						for (var i = 0, len = tagAll.length; i < len; i++) {
							if (tagAll[i].indexOf(subSlector) > -1) {
								tags.push(tagAll[i]);
							}
						}
						return tags;
					}
					break;
				default:
					return node.getElementsByTagName(selector);
					break;
			}
		}
	},
	/*
	 * 绑定事件
	 * @param: node -> html节点
	 * @param: type -> 事件类型
	 * @param: handler -> 事件函数
	 */
	on: function(node, type, handler) {
		return node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
	},
	/*
	 * 删除事件
	 * @param: node -> html节点
	 * @param: type -> 事件类型
	 * @param: handler -> 事件函数
	 */
	off: function(node, type, handler) {
		return node.removeEventListener ? node.removeEventListener(type, handler) : node.detachEvent('on' + type, handler);
	},
	/*
	 * 触发事件
	 * @param: node -> html节点
	 * @param: type -> 事件类型
	 */
	trigger: function(node, type) {
		var e;
		if (document.createEvent) {
			e = document.createEvent('HTMLEvents');
			e.initEvent(type, true, true);
			node.dispatchEvent(e);
		} else {
			e = document.createEventObject();
			node.fireEvent('on' + type, e);
		}
	},
	/*
	 * 判断是否含有样式
	 * @param: node -> html节点
	 * @param: event -> class样式名
	 */
	hasClass: function(node, c) {
		return node.className.indexOf(c) > -1 ? true : false;
	},
	/*
	 * 添加样式
	 * @param: node -> html节点
	 * @param: event -> class样式名
	 */
	addClass: function(node, c) {
		node.className = dom.hasClass(node, c) ? node.className : node.className + ' ' + c;
	},
	/*
	 * 删除样式
	 * @param: node -> html节点
	 * @param: event -> class样式名
	 */
	removeClass: function(node, c) {
		if (!dom.hasClass(node, c)) return false;
		var reg = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g'),
			cn = node.className;
		while (reg.test(cn)) {
			cn = cn.replace(reg, ' ');
		};
		cn = fn.trim(cn);
		node.className = cn.replace(/\s+/g, ' ');
	},
	/*
	 * 获取节点在视口中(Client)中的位置
	 * @param: node
	 */
	getClientPos: function(node) {
		return node.getBoundingClientRect();
	},
	/*
	 * 获取滚动条位置
	 * @param: none
	 */
	getScrollPos: function() {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
			scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
		return {
			scrollTop: scrollTop,
			scrollLeft: scrollLeft
		};
	},
	/*
	 * 设置滚动条位置
	 * @param: object
	 */
	setScrollPos: function(scrollPos) {
		if (dom.isIE()) {
			document.documentElement.scrollTop = scrollPos.scrollTop;
			document.documentElement.scrollLeft = scrollPos.scrollLeft;
		} else {
			document.body.scrollTop = scrollPos.scrollTop;
			document.body.scrollLeft = scrollPos.scrollLeft;
		}
	},
	/*
	 * 获取事件源对像
	 * @param: event
	 */
	getEvent: function(e) {
		return e ? e : window.event;
	},
	/*
	 * 阻止事件冒泡
	 * @param: event
	 */
	stopPropagation: function(e) {
		e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true;
	},
	/*
	 * 判断是否是IE
	 * @param: none
	 */
	isIE: function() {
		return document.attachEvent ? true : false;
	},
	/*
	 * 判断是否是左键按下
	 * @param: event
	 */
	isLeftMouse: function(e) {
		if (dom.isIE() && e.button === 1) {
			return true;
		} else if (e.button === 0) {
			return true;
		} else {
			return false;
		}
	},
	/*
	 * 设置鼠标样式
	 * @param: key -> cursorType
	 * @param: value -> nodeArray
	 */
	setCursors: function(options) {
		for (var key in options) {

			for (var i = 0, len = options[key].length; i < len; i++) {
				options[key][i].style.cursor = key;
			}
		}
	}
};

/* 工具方法 */
var fn = {
	/*
	 * 判断是否是空对象
	 * @param: object
	 */
	isEmptyObj: function(obj) {
		for(var i in obj) {
			if(obj.hasOwnProperty(i)){
				return false;
			}
		}
		return true;
	},
	/*
	 * 判断是否是对象 
	 * @param: object
	 */
	isObject: function(param) {
		return Object.prototype.toString.call(param) == '[object Object]' ? true : false;
	},
	/*
	 * 判断是否是数组
	 * @param: object
	 */
	isArray: function(param) {
		return Object.prototype.toString.call(param) == '[object Array]' ? true : false;
	},
	/*
	 * 判断是否是字符串
	 * @param: object
	 */
	isString: function(param) {
		return Object.prototype.toString.call(param) == '[object String]' ? true : false;
	},
	/*
	 * 判断是否是数字
	 * @param: object
	 */
	isNumber: function(param) {
		return Object.prototype.toString.call(param) == '[object Number]' ? true : false;
	},
	/*
	 * 判断是否是function
	 * @param: object
	 */
	isFunction: function(param) {
		return Object.prototype.toString.call(param) == '[object Function]' ? true : false;
	},
	/*
	 * 判断是否是null
	 * @param: object
	 */
	isNull: function(param) {
		return Object.prototype.toString.call(param) == '[object Null]' ? true : false;
	},
	/*
	 * 判断是否是undefind
	 * @param: object
	 */
	isUndefined: function(param) {
		return Object.prototype.toString.call(param) == '[object Undefined]' ? true : false;
	},
	/*
	 * 删除开始和结尾的空白字符
	 * @param: String
	 */
	trim: function(str) {
		return str.replace(/^\s+|\s+$/, '');
	}
};

// 原型扩展
/*
 * 克隆对象
 * @param: none
 * todo
 */
Object.prototype.clone = function() {
    var objClone;
    if ( this.constructor == Object ) objClone = new this.constructor(); 
    else objClone = new this.constructor(this.valueOf()); 
    for ( var key in this ) {
        if ( objClone[key] != this[key] ) { 
            if ( typeof(this[key]) == 'object') { 
                objClone[key] = this[key].clone();
            }
            else {
                objClone[key] = this[key];
            }
        }
    }
    objClone.toString = this.toString;
    objClone.valueOf = this.valueOf;
    return objClone; 
 };
