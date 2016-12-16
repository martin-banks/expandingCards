const caption = require('./template_imageCaption').caption
const credit = require('./template_imageCaption').credit
const config = require('./config')


module.exports = image =>{
	let captionContent = [
		!!image.caption && image.caption.length > 0 ? caption(image.caption) : '',
		!!image.credit && image.credit.length > 0 ? credit(image.credit) : '',
	].join('')

	let captionContainer = `<div class="cc-imageCaptionContainer">${captionContent}</div>`
	
	let inlineImage = `
		<div class="cc-inlineImage">
			<img class="cc-image"
				alt="${!!image.caption && image.caption.length>0 ? image.caption : ''}" 
				src="${config.imagePath}/${image.name}" 
			/>
		</div>
	`

	return `
		<div class="cc-inlineImageContainer">
			${inlineImage}
			${captionContainer}
		</div>
	`
}