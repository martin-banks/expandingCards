const caption = require('./template_imageCaption').caption
const credit = require('./template_imageCaption').credit
const config = require('./config')




module.exports = title => {
	let kicker = !!title.kicker && title.kicker.length > 0 ? `` : ''
	let title = !!title.title && title.title.length > 0 ? `` : ''
	let intro = !!title.intro && title.intro.length > 0 ? `` : ''
	

}