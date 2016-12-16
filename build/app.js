(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	"use strict";

	var util = require('./utility');
	var checkMobile = require('./checkMobile');
	var content = require('./content');
	var bodyTemplate = require('./bodyTemplate');
	var headerTemplate = require('./headerTemplate');
	var loadMaterialIcons = require('./loadMaterialIcons')();

	var button = function button(icon) {
		return '<div class="cc-button">' + icon + '</div>';
	};

	var cardContent = [headerTemplate(content.cards[0].header), '<div class="cc-cardBodyContainer">' + bodyTemplate(null) + '</div>', button(content.cta.showmore)].join('');

	var isMobile = function isMobile() {
		return !!checkMobile() ? 'cc-appMobile' : 'cc-appDesktop';
	};
	var cardContainer = function cardContainer() {
		return '\n\t\t<div class="cc-cardContainer ' + isMobile() + '" data-state="closed">\n\t\t\t' + cardContent + '\n\t\t</div>\n\t';
	};

	document.querySelector('.cc-expandingCard-appContainer').innerHTML = cardContainer();

	util.delegate('.cc-expandingCard-appContainer', 'click', '.cc-button', function (e) {
		var thisCard = util.closest(e.target, '.cc-cardContainer');
		var thisKey = thisCard.getAttribute('data-key');

		if (thisCard.getAttribute('data-state') === 'closed') {
			thisCard.querySelector('.cc-button').innerHTML = content.cta.showless;
			thisCard.setAttribute('data-state', 'open');
			thisCard.querySelector('.cc-cardBodyContainer').innerHTML = bodyTemplate(content.cards[0].body);
			thisCard.querySelector('.cc-cardBodyContainer').style.opacity = 1;
			thisCard.querySelector('.cc-cardBodyContainer').style.maxHeight = '1000px';
			return;
		} else if (thisCard.getAttribute('data-state') === 'open') {
			thisCard.querySelector('.cc-button').innerHTML = content.cta.showmore;
			thisCard.setAttribute('data-state', 'closed');
			thisCard.querySelector('.cc-cardBodyContainer').style.opacity = '';
			thisCard.querySelector('.cc-cardBodyContainer').style.maxHeight = '';
			setTimeout(function () {
				thisCard.querySelector('.cc-cardBodyContainer').innerHTML = bodyTemplate(null);
			}, 500);

			return;
		}
	});
})();

},{"./bodyTemplate":2,"./checkMobile":3,"./content":5,"./headerTemplate":6,"./loadMaterialIcons":7,"./utility":15}],2:[function(require,module,exports){
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
	if (!!bodyElements) {
		var templatedContent = bodyElements.map(function (elem) {
			if (typeof elem === 'string') {
				return templates.par(elem);
			} else if ((typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) === 'object') {
				var type = elem.type;
				return templates[type](elem);
			}
		}).join('');

		return templatedContent;
	} else {
		return '';
	}
};

},{"./template_crosshead":8,"./template_image":10,"./template_linkButton":12,"./template_list":13,"./template_par":14}],3:[function(require,module,exports){
"use strict";

module.exports = function () {
	var mobile = /iPad|Android|webOS|iPhone|iPod|Blackberry/.test(navigator.userAgent) && !window.MSStream;
	return mobile ? true : false;
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
	imagePath: '../images'
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = {
	cta: {
		showmore: 'Show more <i class="material-icons">expand_more</i>',
		showless: 'Show less <i class="material-icons">expand_less</i>'
	},

	cards: [{
		header: {
			kicker: 'kicker',
			title: 'Card title',
			intro: 'Card intro Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore voluptatem quaerat, ',
			image: {
				type: 'thumb', /*thumb || background*/
				name: '16x9.jpg'
			}
		},
		body: [{
			type: 'image',
			name: '16x9.jpg',
			caption: 'Image caption',
			credit: 'image credit'
		}, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum placeat recusandae veritatis aut, rem repudiandae dolorem omnis possimus labore sunt! Expedita cupiditate praesentium voluptatum nemo, repellat fuga ad sequi harum!', {
			type: 'crosshead',
			text: 'Crosshead text'
		}, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum placeat recusandae veritatis aut, rem repudiandae dolorem omnis possimus labore sunt! Expedita cupiditate praesentium voluptatum nemo, repellat fuga ad sequi harum!', {
			type: 'list',
			entries: ['First list item', 'Second list item']
		}, {
			type: 'linkButton',
			text: 'link text',
			link: ''
		}]
	} /*end of card*/

	]

};

},{}],6:[function(require,module,exports){
"use strict";

var cardTitle = function cardTitle(text) {
	return '<h2 class="cc-cardTitle">' + text + '</h2>';
};
var cardIntro = function cardIntro(text) {
	return '<h4 class="cc-cardIntro">' + text + '</h4>';
};
var cardKicker = function cardKicker(text) {
	return '<h6 class="cc-cardKicker">' + text + '</h6>';
};
var headerImage = require('./template_headerImage');

module.exports = function (header) {
	console.log('HEADER CONTENT:', header);
	var headerText = [!!header.kicker && header.kicker.length > 0 ? cardKicker(header.kicker) : '', !!header.title && header.title.length > 0 ? cardTitle(header.title) : '', !!header.intro && header.intro.length > 0 ? cardIntro(header.intro) : ''].join('');

	var headerImageContainer = !!header.image.name && header.image.name.length > 0 ? headerImage(header.image) : '';

	return '<div class="cc-headerContainer">\n\t\t' + headerImageContainer + '\n\t\t<div class="cc-headerTextContainer">' + headerText + '</div>\n\t</div>';
};

},{"./template_headerImage":9}],7:[function(require,module,exports){
'use strict';

var head = document.getElementsByTagName('head')[0];
var materialIconFont = document.createElement('link');
materialIconFont.id = 'cc-materialIconFont';
materialIconFont.rel = 'stylesheet';
materialIconFont.type = 'text/css';
materialIconFont.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
materialIconFont.media = 'all';

module.exports = function () {
	var checkForFont = head.querySelector('#cc-materialIconFont');
	if (!checkForFont) {
		head.appendChild(materialIconFont);
	} else {
		console.log('font exists');
		return;
	}
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function (elem) {
	if (!!elem.text && elem.text.length > 0) {
		return '<h3 class=\'cc-crosshead\'>' + elem.text + '</h3>';
	} else {
		return '';
	}
};

},{}],9:[function(require,module,exports){
'use strict';

var caption = require('./template_imageCaption').caption;
var credit = require('./template_imageCaption').credit;
var config = require('./config');

var imageTypes = ['thumb', 'background'];

module.exports = function (image) {
	var imageType = function imageType() {
		console.log('checking type');
		if (!!image.type && image.type.length > 0) {
			console.log('checking valid type');
			if (imageTypes.indexOf(image.type) !== -1) {
				console.log('return type: ', image.type);
				return '-' + image.type;
			} else {
				return '';
			}
		}
	};

	var headerImage = '\n\t\t<div class="cc-headerImage' + imageType() + '">\n\t\t\t<img class="cc-image"\n\t\t\t\talt="' + (!!image.caption && image.caption.length > 0 ? image.caption : '') + '" \n\t\t\t\tsrc="' + config.imagePath + '/' + image.name + '" \n\t\t\t/>\n\t\t</div>\n\t';

	return '\n\t\t<div class="cc-headerImageContainer">\n\t\t\t' + headerImage + '\n\t\t</div>\n\t';
};

},{"./config":4,"./template_imageCaption":11}],10:[function(require,module,exports){
'use strict';

var caption = require('./template_imageCaption').caption;
var credit = require('./template_imageCaption').credit;
var config = require('./config');

module.exports = function (image) {
	var captionContent = [!!image.caption && image.caption.length > 0 ? caption(image.caption) : '', !!image.credit && image.credit.length > 0 ? credit(image.credit) : ''].join('');

	var captionContainer = '<div class="cc-imageCaptionContainer">' + captionContent + '</div>';

	var inlineImage = '\n\t\t<div class="cc-inlineImage">\n\t\t\t<img class="cc-image"\n\t\t\t\talt="' + (!!image.caption && image.caption.length > 0 ? image.caption : '') + '" \n\t\t\t\tsrc="' + config.imagePath + '/' + image.name + '" \n\t\t\t/>\n\t\t</div>\n\t';

	return '\n\t\t<div class="cc-inlineImageContainer">\n\t\t\t' + inlineImage + '\n\t\t\t' + captionContainer + '\n\t\t</div>\n\t';
};

},{"./config":4,"./template_imageCaption":11}],11:[function(require,module,exports){
"use strict";

var caption = function caption(text) {
	return "<p class=\"cc-caption\">" + text + "</p>";
};
var credit = function credit(text) {
	return "<p class=\"cc-credit\">" + text + "</p>";
};

module.exports = {
	caption: caption,
	credit: credit
};

},{}],12:[function(require,module,exports){
'use strict';

var config = require('./config');

module.exports = function (button) {
	console.log('checking button');
	var buttonText = !!button.text && button.text.length > 0 ? button.text : '';
	var buttonLink = !!button.link && button.link.length > 0 ? button.link : '#';

	var buttonTemplate = '\n\t\t<a href="' + buttonLink + '" class="cc-linkButton">\n\t\t\t<div class="cc-buttonTextContainer">\n\t\t\t\t<div class="cc-buttonText">\n\t\t\t\t\t<span class="cc-buttonIcon">\n\t\t\t\t\t\t<img src="' + config.imagePath + '/ic_link_black_24dp_2x.png" alt="link" />\n\t\t\t\t\t</span>\n\t\t\t\t\t' + buttonText + '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</a>\n\t';

	return buttonTemplate;
};

},{"./config":4}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function (text) {
	if (!!text && text.length > 0) {
		return '<p class=\'cc-cardtext\'>' + text + '</p>';
	} else {
		return '';
	}
};

},{}],15:[function(require,module,exports){
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

module.exports = {
	delegate: delegate,
	closest: closest
};

},{}]},{},[1]);
