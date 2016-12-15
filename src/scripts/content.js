module.exports = {
	cta: {
		showmore: 'Show more',
		showless: 'Show less',
	},

	titleBlock: {
		kicker:'', 
		title: 'This is the main title',
		intro: 'Main Intro',
		image: ''
	},

	cards: {
		a: {
			intro: {
				kicker: '',
				title: 'Card title',
				intro: 'card intro',	
			},
			displayImage: {
				image: '',
			},
			body: [
				'Some paragraph of text',
				{
					type: 'image', 
					name: 'image.jpg',
					caption: 'Image caption',
					credit: 'image credit'					
				},
				{
					type: 'list',
					entries: [
						'First list item',
						'Second list item'
					]
				},
				{
					type: 'crosshead',
					text: 'Crosshead text'
				},
				{
					type: 'linkButton',
					text: '',
					link: ''
				}
			] 
		}/*end of card*/

	}

	
}