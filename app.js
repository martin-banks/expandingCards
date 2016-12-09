"use strict"
const util = require('./utility')

let content = {
	title: 'This is the main title',
	intro: 'Main Intro',
	showmore: 'Show more',
	showless: 'Show less',
	articles: {
		a: {
			title: 'Card title',
			intro: 'card intro',
			text: 'card text',
			image: 'testing.png',
		},
		b: {
			title: 'Card title',
			intro: 'card intro',
			text: 'card text',
			image: 'testing.png',
		},
		c: {
			title: 'Card title',
			intro: 'card intro',
			text: 'card text',
			image: 'testing.png',
		},
		d: {
			title: 'Card title',
			intro: 'card intro',
			text: 'card text',
			image: 'testing.png',
		}
	}
}


let cardTitle = (text)=> `<h2>${text}</h2>`
let cardIntro = (text)=> `<h4>${text}</h4>`
let cardText = (text)=> `<p class='cc-cardtext'>${text}</p>`
let button = (icon)=> `<div class="cc-button">${icon}</div>`

let container = props=> `
	<div 
		class="cc-profileCard" 
		style="background-image:url(../images/${props.image})"
		data-key="${props.key}"
		data-state='closed'
	>
		${props.content}
	</div>
	`


let cardTemplate = (props)=>{
	return container({
		image: props.image,
		key: props.key,
		content: [
			cardTitle(props.title),
			cardIntro(props.intro),
			cardText(''),
			button(content.showmore)
		].join('')
	})
}

let composeAllCards = ()=>{
	let keys = Object.keys(content.articles)
	return keys.map(key=>{
		return cardTemplate({
			title: content.articles[key].title,
			image: content.articles[key].image,
			intro: content.articles[key].intro,
			key: key
		})
	}).join('')
}


document.querySelector('.appContainer').innerHTML = composeAllCards()

util.delegate('.appContainer', 'click', '.cc-profileCard', (e)=>{
	let thisCard = util.closest(e.target, '.cc-profileCard')
	let thisKey = thisCard.getAttribute('data-key')
	
	if(thisCard.getAttribute('data-state') === 'closed'){
		thisCard.querySelector('.cc-button').innerHTML = content.showless
		thisCard.setAttribute('data-state', 'open')
		thisCard.querySelector('.cc-cardtext').innerHTML = content.articles[thisKey].text
		thisCard.querySelector('.cc-cardtext').classList.add('heightauto')
		return
	} else if(thisCard.getAttribute('data-state') === 'open'){
		thisCard.querySelector('.cc-button').innerHTML = content.showmore
		thisCard.setAttribute('data-state', 'closed')
		thisCard.querySelector('.cc-cardtext').innerHTML = ''
		thisCard.querySelector('.cc-cardtext').classList.remove('heightauto')
		return
	}
})

