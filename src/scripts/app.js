(()=>{
	"use strict"

	const util = require('./utility')
	let content = require('./content')
	let bodyTemplate = require('./bodyTemplate')
	let headerTemplate = require('./headerTemplate')

	let button = (icon)=> `<div class="cc-button">${icon}</div>`


	let cardContent = [
		headerTemplate(content.cards[0].header),
		bodyTemplate(content.cards[0].body)
	].join('')

	let cardContainer = ()=>`
		<div class="cc-cardContainer">
			${cardContent}
		</div>
	`


	document.querySelector('.cc-expandingCard-appContainer').innerHTML = cardContainer()







	util.delegate('.cc-expandingCard-appContainer', 'click', '.cc-profileCard', (e)=>{
		let thisCard = util.closest(e.target, '.cc-profileCard')
		let thisKey = thisCard.getAttribute('data-key')
		
		if(thisCard.getAttribute('data-state') === 'closed'){
			thisCard.querySelector('.cc-button').innerHTML = content.cta.showless
			thisCard.setAttribute('data-state', 'open')
			thisCard.querySelector('.cc-cardtext').innerHTML = content.articles[thisKey].text
			thisCard.querySelector('.cc-cardtext').style.opacity = 1
			thisCard.querySelector('.cc-cardtext').style.height = '100px'
			return
		
		} else if(thisCard.getAttribute('data-state') === 'open'){
			thisCard.querySelector('.cc-button').innerHTML = content.cta.showmore
			thisCard.setAttribute('data-state', 'closed')
			thisCard.querySelector('.cc-cardtext').innerHTML = ''
			thisCard.querySelector('.cc-cardtext').style.opacity = ''
			thisCard.querySelector('.cc-cardtext').style.height = ''
			return
		}
	})




})()