module.exports = elem => {
	if (!!elem.text && elem.text.length>0){
		return `<h3 class='cc-crosshead'>${elem.text}</h3>`
	} else {
		return ''
	}
	
}

