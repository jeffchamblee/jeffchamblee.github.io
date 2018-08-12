var fullQuizMulti = {
	'title': 'Test Your Knowledge of Space Telescopes',
	'subtitle': 'Missions Quiz',
	'introText': 'Do you know your space telescope satellites and missions?',
	'questions': [
			{
			'title': 'What were known as the "four great observatories" launched between 1990 and 2003?',
			'subtitle': '',
			'type': 'multi-select',
			'question': '',
			'options': [
				'Hubble',
				'Spitzer',
				'Kepler',
				'Copernicus',
				'Far Ultraviolet Spectroscopic Explorer',
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
			'subtitle': 'Use your mouse to drag missions into position',
			'type': 'match',
			'firstColumn': [
				'The first orbiting telescope specializing in visible light',
				'The goal of this mission is to discover earth-sized exoplanets',
				'The goal of this mission is to provide a comprehensive picture of the health of the earth',
				'Able to rapidly respond to targets of opportunity such as comets, novae and supernova',
				'Conducts short wave ultraviolet survey of 801 astronomical targets'
			],
			'secondColumn': [
				'Hubble Space Telescope',
				'Kepler',
				'Copernicus',
				'IUE',
				'EUVE'
			]
		},
		{
			'title': 'Match the mission with the description.',
			'subtitle': 'Use your mouse to drag missions into position',
			'type': 'match',
			'firstColumn': [
				'Learns about stellar processing times of deuterium left over from the Big Bang',
				'Measures the history of star formation in the universe using ultraviolet',
				'The goal of this mission is to survey the brightest stars near earth for transiting exoplanets',
				'Uses infrared to precisely measure the expansion of the universe, the effects of dark energy, the constancy of general relativity and the curvature of spacetime',
				'Constructs the largest and most precise 3D space catalog ever made, totaling approximately 1 billion astronomical objects, mainly stars, but also planets, comets, asteroids and quasars among others'	
			],
			'secondColumn': [
				'FUSE',
				'GALAX',
				'TESS',
				'WFIRST',
				'Gaia'
			]
		},
		{
			'title': 'Match the mission with the description.',
			'subtitle': 'Use your mouse to drag missions into position',
			'type': 'match',
			'firstColumn': [
				'The goal of this mission is to determine the origin of gamma ray bursts',
				'The goal of this mission is to investigate intersteller X-ray sources',
				'Scans the whole southern sky every few days. Tracks changes in supernovae and asteroids that could strike the earth.',
				'Due to a gyroscope failure, this observatory was de-orbited in 2000.',
				'An infrared telescope whose biggest successes have been in studying exoplanets. It ran out of coolant in 2009, but it is still operating in a limited way.',
			],
			'secondColumn': [
				'SWIFT',
				'XMM-Newton',
				'Large Synoptic Survey Telescope (LSST)',
				'Compton Gamma Ray Observatory',
				'Spitzer Space Telescope'
			]
		},
		{
			'title': 'Match the mission with the description.',
			'subtitle': 'Use your mouse to drag missions into position',
			'type': 'match',
			'firstColumn': [
				'Performs gamma-ray astronomy observations from low Earth orbit.  It is the most sensitive gamma-ray observatory in orbit,',
				'Studies astronomical objects with high angular resolution by using the satellite in conjunction with ground-based observatories and interferometry techniques.',
				'ESA mission from 2009 to 2013. Defined the most precise measurements of the average density of ordinary matter and dark matter in the Universe and the age of the universe. ',
				'Operated from 2001 to 2010. Measured temperature differences across the sky in the cosmic microwave background. Played a key role in establishing the current Standard Model of Cosmology: the Lambda-CDM model.'	
				],
			'secondColumn': [
				'Fermi/GLAST',
				'Spectr-R',
				'Plank',
				'WMAP'
			]
		},
		{
			'title': 'Match the observatory type with the description.',
			'subtitle': 'Use your mouse to drag missions into position',
			'type': 'match',
			'firstColumn': [
				'detect quasars, pulsars, and the most energetic bursts from distant galaxies',
				'detect the solar corona, supernova remnants, and gas that spirals around black holes',
				'detect the hottest stars',
				'study cooler gas and dust regions that are condensing to form new stars as well as solar systems, exoplanets and the early universe',
				'study cosmic background radiation – the radiant heat remaining from the Big Bang'
			],
			'secondColumn': [
				'Gamma ray observatories',
				'X-ray observatories',
				'Ultraviolet observatories',
				'Infrared observatories',
				'Microwave observatories'
			]
		}
	]
}

function getQuizData() {
	return fullQuizMulti;
}