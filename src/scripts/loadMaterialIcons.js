const head  = document.getElementsByTagName('head')[0]
let materialIconFont  = document.createElement('link')
		materialIconFont.id = 'cc-materialIconFont'
		materialIconFont.rel = 'stylesheet'
		materialIconFont.type = 'text/css'
		materialIconFont.href = `https://fonts.googleapis.com/icon?family=Material+Icons`
		materialIconFont.media = 'all'


module.exports = ()=> {
	let checkForFont = head.querySelector('#cc-materialIconFont')
	if(!checkForFont){
		head.appendChild(materialIconFont)
	} else {
		console.log('font exists')
		return
	}

}