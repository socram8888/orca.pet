// ==UserScript==
// @name        Global Aliexpress
// @namespace   https://orca.pet
// @version     1.0.0
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Redirects localized versions of AliExpress to the English global version
// @homepage    https://orca.pet/userscripts/
// @updateURL   https://orca.pet/userscripts/global-aliexpress.meta.js
// @downloadURL https://orca.pet/userscripts/global-aliexpress.user.js
// @supportURL  https://github.com/socram8888/orca.pet
// @match https://*.aliexpress.com/*
// @grant none
// ==/UserScript==

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
window.Cookies=function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var r in t)n[r]=t[r]}return n}function n(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function t(r){function o(){}function i(n,t,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},o.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var c=JSON.stringify(t);/^[\{\[]/.test(c)&&(t=c)}catch(e){}t=r.write?r.write(t,n):encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var u="";for(var f in i)i[f]&&(u+="; "+f,!0!==i[f]&&(u+="="+i[f].split(";")[0]));return document.cookie=n+"="+t+u}}function c(e,t){if("undefined"!=typeof document){for(var o={},i=document.cookie?document.cookie.split("; "):[],c=0;c<i.length;c++){var u=i[c].split("="),f=u.slice(1).join("=");t||'"'!==f.charAt(0)||(f=f.slice(1,-1));try{var a=n(u[0]);if(f=(r.read||r)(f,a)||n(f),t)try{f=JSON.parse(f)}catch(e){}if(o[a]=f,e===a)break}catch(e){}}return e?o[e]:o}}return o.set=i,o.get=function(e){return c(e,!1)},o.getJSON=function(e){return c(e,!0)},o.remove=function(n,t){i(n,"",e(t,{expires:-1}))},o.defaults={},o.withConverter=t,o}(function(){})}();

function parseQuery(query) {
	let obj = {};

	for (var part of query.split("&")) {
		if (part.length == 0) {
			continue;
		}

		let equals = part.indexOf('=');
		let key, value;
		if (equals >= 1) {
			key = decodeURIComponent(part.substr(0, equals));
			value = decodeURIComponent(part.substr(equals + 1));
		} else {
			key = decodeURIComponent(part);
			value = '';
		}

		obj[key] = value;
	}

	return obj;
}

function buildQuery(obj) {
	let result = '';

	for (var key in obj) {
		result += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
	}

	return result.substr(1);
}

function redirect() {
	let aepUsuc = Cookies.get('aep_usuc_f');
	if (aepUsuc) {
		aepUsuc = parseQuery(aepUsuc);
		aepUsuc.site = 'glo';
		aepUsuc.b_locale = 'en_US';
		console.log(aepUsuc);
		Cookies.set('aep_usuc_f', buildQuery(aepUsuc), {domain: '.aliexpress.com'});
	}

	let xmanUs = Cookies.get('xman_us_f');
	if (xmanUs) {
		xmanUs = parseQuery(xmanUs);
		xmanUs.x_locale = 'en_US';
		Cookies.set('xman_us_f', buildQuery(aepUsuc), {domain: '.aliexpress.com'});
	}

	if (Cookies.get('b_locale') != 'en_US') {
		Cookies.set('b_locale', 'en_US', {domain: '.aliexpress.com'});
	}

	console.log(Cookies.get());
	location.hostname = "www.aliexpress.com";
}

if ('my.aliexpress.com' && location.hostname.match("^[a-z]{2}\.aliexpress\.com$")) {
	redirect();
}
