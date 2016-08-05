/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _resource = __webpack_require__(1);

	var _template = __webpack_require__(2);

	var doc = document;

	//username
	var username = doc.querySelector(".github-widget").dataset.username;

	//init
	html('.github-widget', '<div class="gh-wrap1"></div><table class="gh-tb"></table><div class="gh-foot"></div>');
	css(_template.cssString);

	// ready
	doc.addEventListener('DOMContentLoaded', start);

	function start() {

	    //user
	    (0, _resource.resource)({
	        url: 'https://api.github.com/users/' + username,
	        render: function render(res) {
	            html('.gh-wrap1', (0, _template.topTemplateString)(res));
	        }
	    });

	    (0, _resource.resource)({
	        url: 'https://api.github.com/users/' + username + '/repos',
	        filter: function filter(res) {

	            var now = new Date();
	            var latestDate = res.sort(function (a, b) {
	                return new Date(b.updated_at) - new Date(a.updated_at);
	            }).slice(0, 1)[0].updated_at;

	            var difference = now - new Date(latestDate);
	            difference = Math.floor(difference / (1000 * 3600 * 24));
	            latestDate = difference ? difference + ' day(s) ago' : 'Today';

	            return {
	                list: res.sort(function (a, b) {
	                    return b.stargazers_count - a.stargazers_count;
	                }).slice(0, 3),
	                latestDate: latestDate
	            };
	        },

	        render: function render(res) {

	            //items
	            var itemString = res.list.map(function (v) {
	                return (0, _template.itemTemplateString)(v);
	            }).join('');
	            html('.gh-tb', itemString);

	            //footer
	            html('.gh-foot', (0, _template.footTemplateString)(res));
	        }
	    });
	};

	function html(parentSelector, html) {
	    doc.querySelector(parentSelector).innerHTML = html;
	}

	function css(str) {
	    var body = doc.querySelector('body');
	    var childNode = doc.createElement('style');
	    childNode.innerHTML = str;
	    body.appendChild(childNode);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.resource = resource;
	function resource() {
	    var opt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var request = new XMLHttpRequest();
	    request.open('GET', opt.url, true);
	    request.onload = function () {
	        if (request.status === 200) {
	            var data = JSON.parse(request.responseText);

	            //filter
	            if (opt.filter) {
	                data = opt.filter(data);
	            }

	            //render
	            opt.render(data);
	        }
	    };
	    request.send();
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var topTemplateString = function topTemplateString(data) {
	    return "\n      <div class=\"gh-top\">\n           <div class=\"gh-top-photo\"><img src=\"" + data.avatar_url + "\" width=\"90\" alt=\"\"></div>\n           <div class=\"gh-top-text\">\n               <div class=\"gh-name\">" + data.name + "</div><div class=\"gh-location\">" + data.location + "</div>\n           </div>\n       </div>\n       <table class=\"gh-count\"><tr>\n           <td><span>" + data.followers + "</span>Followers</td>\n           <td><span>" + data.following + "</span>Following</td>\n           <td><span>" + data.public_repos + "</span>Repositories</td>\n       </tr></table>\n       <div class=\"gh-h2\">Top repositories</div>";
	};

	var itemTemplateString = function itemTemplateString(data) {
	    return "\n      <tr>\n      <td width=\"50%\"><a href=\"" + data.html_url + "\">" + data.name + "</a></div></td>\n      <td width=\"25%\">" + data.language + "</td>\n      <td width=\"25%\">★" + data.stargazers_count + "</td>\n      </tr>";
	};

	var footTemplateString = function footTemplateString(data) {
	    return "\n      <a class=\"gh-link\" target=\"new\" href=\"https://github.com/' + username + '\">Follow</a>\n      <span>Last active: " + data.latestDate + "</span>";
	};

	var cssString = "\n      @import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);\n      .github-widget{border:1px solid #DDD;color:#333;max-width:350px; padding: 10px; color:#333; font-family:Noto Sans,sans-serif}\n      .github-widget a {color:#4078C0;text-decoration:none}\n      .gh-top{height:100px;padding:10px}\n      .gh-top img{border:1px solid #eee;border-radius:50%}\n      .gh-top-photo{width:20%;float:left}\n      .gh-top-text{width:60%;float:right;text-align:center}\n      .gh-name{font-size:1.5em;line-height:1.5em;padding:10px 0 0 0}\n      .gh-count{width: 100%; text-align: center; border-bottom: 1px solid #eee; padding: 0 0 20px 0}\n      .gh-count span{display: block}\n      .gh-h2{font-weight:400;color:#666;text-align:center;padding:15px}\n      .gh-names{width:50%}\n      .gh-language{width:25%}\n      .gh-stars{width:25%;text-align:center}\n      .gh-foot{padding:10px}\n      .gh-link{display:inline-block;background:#ddd;width:100px;height:28px;text-align:center;line-height:28px}\n      .gh-foot span{float:right;line-height:28px;padding:0 20px 0 0}\n      .gh-tb {width: 100%}\n      .gh-tb td{padding: 10px}";

	exports.topTemplateString = topTemplateString;
	exports.itemTemplateString = itemTemplateString;
	exports.footTemplateString = footTemplateString;
	exports.cssString = cssString;

/***/ }
/******/ ]);