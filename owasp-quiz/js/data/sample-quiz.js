
//This sample quiz has one question of each type for developing, testing and demoing.
var sampleQuiz = {
	'title': 'Test Your Knowledge',
	'subtitle': 'Quiz Demo (4 questions)',
	'introText': 'This sample quiz has one question of each type for developing, testing and demoing.',
	'questions': [
		{
			'title': 'Go Slugs!?',
			'subtitle': 'Match the mascot with the university.',
			'type': 'match',
			'firstColumn': [
				'Catamounts',
				'Artichokes',
				'Fighting Okra',
				'Banana Slugs',
				'Fighting Koalas',
				'Nads',
				'Lord Jeffs',
			],
			'secondColumn': [
				'Vermont',
				'Scottsdale CC',
				'Delta State',
				'California Santa Cruz',
				'Columbia College, South Carolina',
				'Rhode Island School of Design',
				'Amherst College',
			]

		},
		{
			'title': 'Who Said it?',
			'subtitle': 'Match the quotation with the speaker.',
			'type': 'multi',
			'question': '"Less is More."',
			'options': [
				'Ludwig Mies Van der Rohe',
				'Robert Venturi',
				'Louis Sullivan',
				'Frank Lloyd Wright',
				'Frank Gehry'
			],
			'answer': [
				'Ludwig Mies Van der Rohe',
			],
			'explanation': 'Mies van der Rohe, on the benefits of minimalism.'
		},
		{
			'title': 'True or False',
			'subtitle': 'State whether the following statement is True or False.',
			'type': 'multi',
			'question': 'If user input can be confused for instructions in the language or the way the language is applied, then the language is vulnerable to an injection attack.',
			'options': [
				'True',
				'False',
			],
			'answer': [
				'True',
			],
			'explanation': 'Injection attacks rely on the computer accepting instructions in fields expecting data.'
		},
		{
			'title': 'OWASP',
			'subtitle': 'Which of the following languages are the primary targets of cross-site scripting?',
			'type': 'multi-select',
			'question': 'Choose two',
			'options': [
				'HTML',
				'SQL',
				'XSLT',
				'JavaScript',
				'CSS'
			],
			'answer': [
				'HTML',
				'JavaScript',
			],
			'explanation': 'HTML and JavaScript are targets of CSS'
		},
	]
}

function getQuizData() {
	return sampleQuiz;
}