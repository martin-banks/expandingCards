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

	cards: [
		{
			header: {
				kicker: 'kicker',
				title: 'Card title',
				intro: 'card intro',
				displayImage: {
					type: 'inline',
					image: ''
				},
			},
			
			body: [
				'Some paragraph of text',
				{
					type: 'image', 
					name: '16x9.jpg',
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
					text: 'link text',
					link: ''
				}
			] 
		}/*end of card*/

	]

	
}