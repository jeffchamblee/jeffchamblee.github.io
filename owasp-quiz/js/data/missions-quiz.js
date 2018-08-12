var fullQuizMulti = {
	'title': 'Test Your Knowledge of Space Telescopes',
	'subtitle': 'Missions Quiz',
	'introText': 'Do you know your space telescope satellites and missions?',
	'questions': [
			{
			'title': 'Select the four great observatories launched between 1990 and 2003',
			'subtitle': '',
			'type': 'multi-select',
			'question': '',
			'options': [
				'Hubble',
				'Spitzer',
				'Kepler',
				'Copernicus',
				'FUSE',
				'Compton Gamma Ray Observatory',
				'Chandra X-Ray Space Observatory'
			],
			'answer': [
				'Hubble',
				'Spitzer',
				'Compton Gamma Ray Observatory',
				'Chandra X-Ray Space Observatory'
			],
			'explanation': ''
		},
		{
			'title': 'Match the mission with the description.',
			'subtitle': '',
			'type': 'match',
			'firstColumn': [
				'Hubble Space Telescope',
				'Kepler',
				'Copernicus',
				'IUE',
				'EUVE'
			],
			'secondColumn': [
				'The first orbiting telescope specializing in visible light',
				'The goal of this mission is to discover earth-sized exoplanets',
				'The goal of this mission is to provide a comprehensive picture of the health of the earth',
				'Able to rapidly respond to targets of opportunity such as comets, novae and supernova',
				'Short wave ultraviolet survey of 801 astronomical targets'
			]
		},
		{
			'title': 'Match the mission with the description.',
			'subtitle': '',
			'type': 'match',
			'firstColumn': [
				'FUSE',
				'GALAX',
				'TESS',
				'WFIRST',
				'Gaia'
			],
			'secondColumn': [
				'Learn about stellar processing times of deuterium left over from the Big Bang',
				'Measure the history of star formation in the universe using ultraviolet',
				'The goal of this mission is to survey the brightest stars near earth for transiting exoplanets',
				'Uses infrared to precisely measure the expansion of the universe, the effects of dark energy, the constancy of general relativity and the curvature of spacetime',
				'Construct the largest and most precise 3D space catalog ever made, totaling approximately 1 billion astronomical objects, mainly stars, but also planets, comets, asteroids and quasars among others'			]
		},
		{
			'title': 'Match the mission with the description.',
			'subtitle': '',
			'type': 'match',
			'firstColumn': [
				'SWIFT',
				'XMM-Newton',
				'Large Synoptic Survey Telescope (LSST)',
				'Spitzer Space Telescope',
				'Compton Gamma Ray Observatory'
			],
			'secondColumn': [
				'The goal of this mission is to determine the origin of gamma ray bursts',
				'Investigating intersteller X-ray sources',
				'Scan the whole southern sky every few days. Track changes in supernovae and asteroids that could strike the earth.',
				'An infrared telescope whose biggest successes have been in studying exoplanets. It ran out of coolant in 2009, but it is still operating in a limited way.',
				'Due to a gyroscope failure, this observatory was de-orbited in 2000.'
			]
		},
		{
			'title': 'Match the observatory type with the description.',
			'subtitle': '',
			'type': 'match',
			'firstColumn': [
				'Gamma ray observatories',
				'X-ray observatories',
				'Ultraviolet observatories',
				'Infrared observatories',
				'Microwave observatories'
			],
			'secondColumn': [
				'detect quasars, pulsars, and the most energetic bursts from distant galaxies',
				'detect the solar corona, supernova remnants, and gas that spirals around black holes',
				'detect the hottest stars',
				'study a wide range of astronomical objects from solar systems, exoplanets and the early universe. These observatories study cooler gas and dust regions that are condensing to form new stars.',
				'study cosmic background radiation'
			]
		},
		{
			'title': 'In 1964 Robert Wilson and Arno Penzias accidentally discovered what while building a supersensitive, 6-meter horn antenna?',
			'subtitle': '',
			'type': 'multi',
			'question': '',
			'options': [
				'Dark energy',
				'Cosmic microwave background radiation',
				'A quasar',
				'A pulsar'
			],
			'answer': ['Cosmic microwave background radiation'],
			'explanation': ''
		}
	]
}

function getQuizData() {
	return fullQuizMulti;
}