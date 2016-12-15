(()=>{
	"use strict"

	const util = require('./utility')
	let content = require('./content')
	let bodyTemplate = require('./bodyTemplate')
	let headerTemplate = require('./headerTemplate')

	/*let cardTitle = (text)=> `<h2>${text}</h2>`
	let cardIntro = (text)=> `<h4>${text}</h4>`
	let cardKicker = (text)=> `<h6 class="cc_kicker">${text}</h6>`*/
	/*let cardText = (text)=> `<p class='cc-cardtext'>${text}</p>`*/
	let button = (icon)=> `<div class="cc-button">${icon}</div>`

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

	

	let cardContent = [
		headerTemplate(content.cards[0].header),
		bodyTemplate(content.cards[0].body)
	].join('')

	let cardContainer = ()=>`
		<div class="cc-cardContainer">
			${cardContent}
		</div>
	`

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


	document.querySelector('.cc_expandingCard_appContainer').innerHTML = cardContainer()







	util.delegate('.cc_expandingCard_appContainer', 'click', '.cc-profileCard', (e)=>{
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