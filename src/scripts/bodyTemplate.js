"use strict"

const templates = {
	par: require('./template_par'),
	image: require('./template_image'),
	list: require('./template_list'),
	crosshead: require('./template_crosshead'),
	linkButton: require('./template_linkButton')
}


module.exports = bodyElements=>{
	let templatedContent = bodyElements.map(elem=>{
		console.log(elem, typeof elem)
		if(typeof elem === 'string'){
			return templates.par(elem)
		} else if(typeof elem === 'object') {
			let type = elem.type
			return templates[type](elem)
		}
	}).join('')

	return `<div class="cc-cardBodyCotnainer">${templatedContent}</div>` 
}