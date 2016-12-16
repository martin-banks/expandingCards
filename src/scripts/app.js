(()=>{
	"use strict"

	const util = require('./utility')
	const checkMobile = require('./checkMobile')
	let content = require('./content')
	let bodyTemplate = require('./bodyTemplate')
	let headerTemplate = require('./headerTemplate')
	const loadMaterialIcons = require('./loadMaterialIcons')()

	let button = (icon)=> `<div class="cc-button">${icon}</div>`


	let cardContent = [
		headerTemplate(content.cards[0].header),
		`<div class="cc-cardBodyContainer">${bodyTemplate(null)}</div>`,
		button(content.cta.showmore)
	].join('')

	let isMobile = ()=>	!!checkMobile() ? 'cc-appMobile' : 'cc-appDesktop'
	let cardContainer = ()=>`
		<div class="cc-cardContainer ${isMobile()}" data-state="closed">
			${cardContent}
		</div>
	`

	document.querySelector(`.cc-expandingCard-appContainer`).innerHTML = cardContainer()







	util.delegate('.cc-expandingCard-appContainer', 'click', '.cc-button', (e)=>{
		let thisCard = util.closest(e.target, '.cc-cardContainer')
		let thisKey = thisCard.getAttribute('data-key')
		
		if(thisCard.getAttribute('data-state') === 'closed'){
			thisCard.querySelector('.cc-button').innerHTML = content.cta.showless
			thisCard.setAttribute('data-state', 'open')
			thisCard.querySelector('.cc-cardBodyContainer').innerHTML = bodyTemplate(content.cards[0].body)
			thisCard.querySelector('.cc-cardBodyContainer').style.opacity = 1
			thisCard.querySelector('.cc-cardBodyContainer').style.maxHeight = '1000px'
			return
		
		} else if(thisCard.getAttribute('data-state') === 'open'){
			thisCard.querySelector('.cc-button').innerHTML = content.cta.showmore
			thisCard.setAttribute('data-state', 'closed')
			thisCard.querySelector('.cc-cardBodyContainer').style.opacity = ''
			thisCard.querySelector('.cc-cardBodyContainer').style.maxHeight = ''
			setTimeout(function() {
				thisCard.querySelector('.cc-cardBodyContainer').innerHTML = bodyTemplate(null)
			}, 500);
			
			return
		}

	})




})()