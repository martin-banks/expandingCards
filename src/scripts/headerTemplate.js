"use strict"
let cardTitle = (text)=> `<h2 class="cc-cardTitle">${text}</h2>`
let cardIntro = (text)=> `<h4 class="cc-cardIntro">${text}</h4>`
let cardKicker = (text)=> `<h6 class="cc-cardKicker">${text}</h6>`

module.exports = header => {
	console.log('checking header', header)
	let content = [
		!!header.kicker && header.kicker.length > 0 ? cardKicker(header.kicker): '',
		!!header.title && header.title.length > 0 ? cardTitle(header.title): '',
		!!header.intro && header.intro.length > 0 ? cardIntro(header.intro): ''
	].join('')

	console.log('header content tempalted', content)
	return `<div class="cc-headerContainer">${content}</div>`

}