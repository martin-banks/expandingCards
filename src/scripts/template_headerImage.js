const caption = require('./template_imageCaption').caption
const credit = require('./template_imageCaption').credit
const config = require('./config')

const imageTypes = [
	'thumb',
	'background'
]

module.exports = image =>{
	let imageType = ()=> {
		console.log('checking type')
		if (!!image.type && image.type.length > 0){
			console.log('checking valid type')
			if(imageTypes.indexOf(image.type) !== -1){
				console.log('return type: ', image.type)
				return `-${image.type}`
			} else {
				return ''
			}
		}
	}

	let headerImage = `
		<div class="cc-headerImage${imageType()}">
			<img class="cc-image"
				alt="${!!image.caption && image.caption.length>0 ? image.caption : ''}" 
				src="${config.imagePath}/${image.name}" 
			/>
		</div>
	`

	return `
		<div class="cc-headerImageContainer">
			${headerImage}
		</div>
	`
}