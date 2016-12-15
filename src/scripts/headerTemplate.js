"use strict"
let cardTitle = (text)=> `<h2>${text}</h2>`
let cardIntro = (text)=> `<h4>${text}</h4>`
let cardKicker = (text)=> `<h6 class="cc_kicker">${text}</h6>`

module.exports = header => {
	let content = [
		!!header.kicker && header.kicker.length > 0 ? cardKicker(header.kicker): '',
		!!header.title && header.title.length > 0 ? cardTitle(header.title): '',
		!!header.intro && header.intro.length > 0 ? cardIntro(header.intro): ''
	].join('')


	return `<div class="cc-headerContainer">${content}</div>`

}