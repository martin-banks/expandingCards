const config = require('./config')

module.exports = button => {
	console.log('checking button')
	let buttonText = !!button.text && button.text.length > 0 ? button.text : ''
	let buttonLink = !!button.link && button.link.length > 0 ? button.link : '#'

	let buttonTemplate = `
		<a href="${buttonLink}" class="cc-linkButton">
			<div class="cc-buttonTextContainer">
				<div class="cc-buttonText">
					<span class="cc-buttonIcon">
						<img src="${config.imagePath}/ic_link_black_24dp_2x.png" alt="link" />
					</span>
					${buttonText}
				</div>
			</div>
		</a>
	`

	return buttonTemplate

}