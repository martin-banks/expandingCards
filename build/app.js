(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	"use strict";

	var util = require('./utility');
	var content = require('./content');

	var cardTitle = function cardTitle(text) {
		return '<h2>' + text + '</h2>';
	};
	var cardIntro = function cardIntro(text) {
		return '<h4>' + text + '</h4>';
	};
	var cardKicker = function cardKicker(text) {
		return '<h6 class="cc_kicker">' + text + '</h6>';
	};
	var cardText = function cardText(text) {
		return '<p class=\'cc-cardtext\'>' + text + '</p>';
	};
	var button = function button(icon) {
		return '<div class="cc-button">' + icon + '</div>';
	};

	var container = function container(props) {
		return '\n\t\t<div \n\t\t\tclass="cc-profileCard" \n\t\t\tstyle="background-image:url(../images/' + props.image + ')"\n\t\t\tdata-key="' + props.key + '"\n\t\t\tdata-state=\'closed\'\n\t\t>\n\t\t\t' + props.content + '\n\t\t</div>\n\t\t';
	};

	var cardTemplate = function cardTemplate(props) {
		return container({
			image: props.image,
			key: props.key,
			content: [props.kicker.length > 0 ? cardKicker(props.kicker) : '', props.title.length > 0 ? cardTitle(props.title) : '', props.intro.length > 0 ? cardIntro(props.intro) : '', cardText(''), button(content.cta.showmore)].join('')
		});
	};

	var composeAllCards = function composeAllCards() {
		var keys = Object.keys(content.articles);
		return keys.map(function (key) {
			var article = content.articles[key];
			return cardTemplate({
				kicker: article.kicker,
				title: article.title,
				image: article.image,
				intro: article.intro,
				key: key
			});
		}).join('');
	};

	document.querySelector('.cc_expandingCard_appContainer').innerHTML = [composeAllCards()].join('');

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

},{"./content":2,"./utility":3}],2:[function(require,module,exports){
'use strict';

module.exports = {
	headerBlock: {
		kicker: '',
		title: 'This is the main title',
		intro: 'Main Intro'
	},

	articles: {
		a: {
			kicker: '',
			title: 'Card title',
			intro: 'card intro',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ex pariatur, ea cupiditate porro praesentium sequi. Ad sequi labore, reprehenderit ipsum eius nam deleniti similique explicabo aperiam sapiente, atque cum!',
			image: 'testing.png'
		},
		b: {
			kicker: '',
			title: 'Card title',
			intro: 'card intro',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere eius harum, corrupti quasi labore iusto veniam ipsam nam nostrum ad quas optio sed molestiae dicta, doloremque molestias deleniti aliquam vero.',
			image: 'testing.png'
		},
		c: {
			kicker: '',
			title: 'Card title',
			intro: 'card intro',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni deserunt, fugit iste quos voluptatem laudantium voluptatibus mollitia earum vitae, voluptatum, modi optio deleniti laborum quis. Sed saepe non maiores, aut?',
			image: 'testing.png'
		},
		d: {
			kicker: '',
			title: 'Card title',
			intro: 'card intro',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis laborum incidunt fugit error dolores perferendis, nemo amet temporibus sequi eius optio eum molestiae, aliquid magnam odio laboriosam consectetur, vitae et.',
			image: 'testing.png'
		}
	},

	cta: {
		showmore: 'Show more',
		showless: 'Show less'
	}
};

},{}],3:[function(require,module,exports){
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
