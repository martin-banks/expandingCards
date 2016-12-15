const listItem = text => `<li>${text}</li>`

module.exports = list => {
	let listContent = list.entries.map(entry=>{
		return !!entry && entry.length > 0 ? listItem(entry) : ''
	}).join('')

	return `<ul class="cc-listContainer">${listContent}</ul>`

}