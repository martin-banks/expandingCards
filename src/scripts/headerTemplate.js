"use strict"
let cardTitle = (text)=> `<h2 class="cc-cardTitle">${text}</h2>`
let cardIntro = (text)=> `<h4 class="cc-cardIntro">${text}</h4>`
let cardKicker = (text)=> `<h6 class="cc-cardKicker">${text}</h6>`
let headerImage = require('./template_headerImage')

module.exports = header => {
	console.log('HEADER CONTENT:', header)
	let headerText = [
		!!header.kicker && header.kicker.length > 0 ? cardKicker(header.kicker): '',
		!!header.title && header.title.length > 0 ? cardTitle(header.title): '',
		!!header.intro && header.intro.length > 0 ? cardIntro(header.intro): ''
		
	].join('')

	let headerImageContainer = !!header.image.name && header.image.name.length > 0 ? headerImage(header.image) : ''

	return `<div class="cc-headerContainer">
		${headerImageContainer}
		<div class="cc-headerTextContainer">${headerText}</div>
	</div>`

}