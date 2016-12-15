(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	"use strict";

	var util = require('./utility');
	var content = require('./content');
	var bodyTemplate = require('./bodyTemplate');
	var headerTemplate = require('./headerTemplate');

	/*let cardTitle = (text)=> `<h2>${text}</h2>`
 let cardIntro = (text)=> `<h4>${text}</h4>`
 let cardKicker = (text)=> `<h6 class="cc_kicker">${text}</h6>`*/
	/*let cardText = (text)=> `<p class='cc-cardtext'>${text}</p>`*/
	var button = function button(icon) {
		return '<div class="cc-button">' + icon + '</div>';
	};

	/*let container = props=> `
 	<div 
 		class="cc-profileCard" 
 		style="background-image:url(../images/${props.image})"
 		data-key="${props.key}"
 		data-state='closed'
 	>
 		${props.content}
 	</div>
 `*/

	var cardContent = [headerTemplate(content.cards[0].header), bodyTemplate(content.cards[0].body)].join('');

	var cardContainer = function cardContainer() {
		return '\n\t\t<div class="cc-cardContainer">\n\t\t\t' + cardContent + '\n\t\t</div>\n\t';
	};

	/*	let cardTemplate = (props)=>{
 		return container({
 			image: props.image,
 			key: props.key,
 			content: [
 				props.kicker.length>0 ? cardKicker(props.kicker) : '',
 				props.title.length>0 ? cardTitle(props.title) : '',
 				props.intro.length>0 ? cardIntro(props.intro) : '',
 				cardText(''),
 				button(content.cta.showmore)
 			].join('')
 		})
 	}
 
 	let composeAllCards = ()=>{
 		let keys = Object.keys(content.articles)
 		return keys.map(key=>{
 			let article = content.articles[key]
 			return cardTemplate({
 				kicker: article.kicker,
 				title: article.title,
 				image: article.image,
 				intro: article.intro,
 				key: key
 			})
 		}).join('')
 	}*/

	document.querySelector('.cc_expandingCard_appContainer').innerHTML = cardContainer();

	util.delegate('.cc_expandingCard_appContainer', 'click', '.cc-profileCard', function (e) {
		var thisCard = util.closest(e.target, '.cc-profileCard');
		var thisKey = thisCard.getAttribute('data-key');

		if (thisCard.getAttribute('data-state') === 'closed') {
			thisCard.querySelector('.cc-button').innerHTML = content.cta.showless;
			thisCard.setAttribute('data-state', 'open');
			thisCard.querySelector('.cc-cardtext').innerHTML = content.articles[thisKey].text;
			thisCard.querySelector('.cc-cardtext').style.opacity = 1;
			thisCard.querySelector('.cc-cardtext').style.height = '100px';
			return;
		} else if (thisCard.getAttribute('data-state') === 'open') {
			thisCard.querySelector('.cc-button').innerHTML = content.cta.showmore;
			thisCard.setAttribute('data-state', 'closed');
			thisCard.querySelector('.cc-cardtext').innerHTML = '';
			thisCard.querySelector('.cc-cardtext').style.opacity = '';
			thisCard.querySelector('.cc-cardtext').style.height = '';
			return;
		}
	});
})();

},{"./bodyTemplate":2,"./content":4,"./headerTemplate":5,"./utility":11}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var templates = {
	par: require('./template_par'),
	image: require('./template_image'),
	list: require('./template_list'),
	crosshead: require('./template_crosshead'),
	linkButton: require('./template_linkButton')
};

module.exports = function (bodyElements) {
	var templateContent = bodyElements.map(function (elem) {
		console.log(elem, typeof elem === 'undefined' ? 'undefined' : _typeof(elem));
		if (typeof elem === 'string') {
			return templates.par(elem);
		} else if ((typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) === 'object') {
			var type = elem.type;
			return templates[type](elem);
		}
	}).join('');

	return templateContent;
};

},{"./template_crosshead":6,"./template_image":7,"./template_linkButton":8,"./template_list":9,"./template_par":10}],3:[function(require,module,exports){
'use strict';

module.exports = {
	imagePath: '../images'
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
	cta: {
		showmore: 'Show more',
		showless: 'Show less'
	},

	titleBlock: {
		kicker: '',
		title: 'This is the main title',
		intro: 'Main Intro',
		image: ''
	},

	cards: [{
		header: {
			intro: {
				kicker: '',
				title: 'Card title',
				intro: 'card intro'
			},
			displayImage: {
				type: 'inline',
				image: ''
			}
		},

		body: ['Some paragraph of text', {
			type: 'image',
			name: 'testing.png',
			caption: 'Image caption',
			credit: 'image credit'
		}, {
			type: 'list',
			entries: ['First list item', 'Second list item']
		}, {
			type: 'crosshead',
			text: 'Crosshead text'
		}, {
			type: 'linkButton',
			text: 'link text',
			link: ''
		}]
	} /*end of card*/

	]

};

},{}],5:[function(require,module,exports){
"use strict";

var cardTitle = function cardTitle(text) {
	return '<h2>' + text + '</h2>';
};
var cardIntro = function cardIntro(text) {
	return '<h4>' + text + '</h4>';
};
var cardKicker = function cardKicker(text) {
	return '<h6 class="cc_kicker">' + text + '</h6>';
};

module.exports = function (header) {
	var content = [!!header.kicker && header.kicker.length > 0 ? cardKicker(header.kicker) : '', !!header.title && header.title.length > 0 ? cardTitle(header.title) : '', !!header.intro && header.intro.length > 0 ? cardIntro(header.intro) : ''].join('');

	return '<div class="cc-headerContainer">' + content + '</div>';
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function (elem) {
	if (!!elem.text && elem.text.length > 0) {
		return '<h3 class=\'cc-crosshead\'>' + elem.text + '</h3>';
	} else {
		return '';
	}
};

},{}],7:[function(require,module,exports){
'use strict';

var caption = function caption(text) {
	return '<p class="cc-caption">' + text + '</p>';
};
var credit = function credit(text) {
	return '<p class="cc-credit">' + text + '</p>';
};
var config = require('./config');

module.exports = function (image) {
	var captionContent = [!!image.caption && image.caption.length > 0 ? caption(image.caption) : '', !!image.credit && image.credit.length > 0 ? credit(image.credit) : ''].join('');

	var captionContainer = '<div class="cc-imageCaptionContainer">' + captionContent + '</div>';

	var inlineImage = '\n\t\t<div class="cc-inlineImage">\n\t\t\t<img class="cc-image"\n\t\t\t\talt="' + (!!image.caption && image.caption.length > 0 ? image.caption : '') + '" \n\t\t\t\tsrc="' + config.imagePath + '/' + image.name + '" \n\t\t\t/>\n\t\t</div>\n\t';

	return '\n\t\t<div class="cc-inlineImageContainer">\n\t\t\t' + inlineImage + '\n\t\t\t' + captionContainer + '\n\t\t</div>\n\t';
};

},{"./config":3}],8:[function(require,module,exports){
'use strict';

var config = require('./config');

module.exports = function (button) {
	console.log('checking button');
	var buttonText = !!button.text && button.text.length > 0 ? button.text : '';
	var buttonLink = !!button.link && button.link.length > 0 ? button.link : '#';

	var buttonTemplate = '\n\t\t<a href="' + buttonLink + '" class="cc-linkButton">\n\t\t\t<div class="cc-buttonTextContainer">\n\t\t\t\t<div class="cc-buttonText">\n\t\t\t\t\t<span class="cc-buttonIcon">\n\t\t\t\t\t\t<img src="' + config.imagePath + '/ic_link_black_24dp_2x.png" alt="link" />\n\t\t\t\t\t</span>\n\t\t\t\t\t' + buttonText + '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</a>\n\t';

	return buttonTemplate;
};

},{"./config":3}],9:[function(require,module,exports){
'use strict';

var listItem = function listItem(text) {
	return '<li>' + text + '</li>';
};

module.exports = function (list) {
	var listContent = list.entries.map(function (entry) {
		return !!entry && entry.length > 0 ? listItem(entry) : '';
	}).join('');

	return '<ul class="cc-listContainer">' + listContent + '</ul>';
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function (text) {
	if (!!text && text.length > 0) {
		return '<p class=\'cc-cardtext\'>' + text + '</p>';
	} else {
		return '';
	}
};

},{}],11:[function(require,module,exports){
'use strict';

var ie = function () {
	var undef,
	    v = 3,
	    div = document.createElement('div'),
	    all = div.getElementsByTagName('i');
	while (div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->', all[0]) {}
	return v > 4 ? v : undef;
}();

if (ie <= 9) {
	document.getElementById('ieDetect').innerHTML = 'Sorry, this feature is not supported in your browser.';
	document.getElementById('appContainer').style.display = 'none';
} else {}

function siblings(selector) {
	var element = document.querySelector(selector);
	var childElements = Array.from(element.parentNode.children);
	return childElements.filter(function (child) {
		return child !== element;
	});
}

function closest(element, query) {
	while (!!element && element !== document) {
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(query),
				    i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
		} else if (element.matches(query)) {
			return element;
		}
		element = element.parentNode;
	}
	return null;
}
//module.exports = closest

function delegate(selector, eventName, targetSelector, listener) {
	document.querySelector(selector).addEventListener(eventName, function (event) {
		var closestMatch = closest(event.target, targetSelector);
		if (closestMatch) {
			event.delegateTarget = closestMatch;
			listener(event);
		}
	});
};

module.exports = { delegate: delegate, closest: closest };

},{}]},{},[1]);
