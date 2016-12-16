module.exports = {
	cta: {
		showmore: 'Show more <i class="material-icons">expand_more</i>',
		showless: 'Show less <i class="material-icons">expand_less</i>',
	},


	cards: [
		{
			header: {
				kicker: 'kicker',
				title: 'Card title',
				intro: 'Card intro Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore voluptatem quaerat, ',
				image: {
					type: 'thumb',/*thumb || background*/
					name: '16x9.jpg'
				},
			},
			body: [
				{
					type: 'image', 
					name: '16x9.jpg',
					caption: 'Image caption',
					credit: 'image credit'					
				},
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum placeat recusandae veritatis aut, rem repudiandae dolorem omnis possimus labore sunt! Expedita cupiditate praesentium voluptatum nemo, repellat fuga ad sequi harum!',
				{
					type: 'crosshead',
					text: 'Crosshead text'
				},
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum placeat recusandae veritatis aut, rem repudiandae dolorem omnis possimus labore sunt! Expedita cupiditate praesentium voluptatum nemo, repellat fuga ad sequi harum!',
				{
					type: 'list',
					entries: [
						'First list item',
						'Second list item'
					]
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