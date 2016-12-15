module.exports = text => {
	if (!!text && text.length>0){
		return `<p class='cc-cardtext'>${text}</p>`
	} else {
		return ''
	}
} 