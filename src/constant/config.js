export const hostnames = {
    PROD: "https://api.qool90.bet/api",
}

export const statuses = {
	STAKE_STATUSES: {
		0:  'OPEN',
		4:  'LOSE',
		5:  'WIN',
		13: 'CANCEL',
	},
	
	TICKET_STATUSES: {
		0:  'CONFIRMED',
		4:  'LOSE',
		5:  'WON (Not Paid)',
		6:  'WON (Paid Out)',
		9:  'EXPIRED',
		13: 'CANCELLED'
	},
}

export const types = {
	TYPE: {
		0: 'AGENT',
		1: 'SHOP'
	},
	
	PLAYER_TYPE: {
		0: 'ANY',
		1: 'SHOP',
		2: 'WEB',
	}
}

export const timeframe = {
	TIMEFRAME: {
		0: "CURRENT HOURS",
		1: "TODAY",
		2: "THIS WEEK",
		3: "THIS MONTH",
		4: "LAST HOURS",
		5: "YESTERDAY",
		6: "LAST WEEK",
		7: "LAST MONTH"
	}
}

export const modes = {
	STAKE_MODE: {
		0: 'PER BET',
		1: 'PER GROUP'
	},
	
	PRINTING_MODE: {
		0: 'POS',
		1: 'WEB PRINT',
		2: 'Disabled'
	},
}

export const ticket = {
	PAYOUT: {
		0: 'AFTER SCAN',
		1: 'IMMEDIATELY',
		2: 'IMMEDIATELY TO WALLET'
	}
}

export const service = {
	GAMES: {
		0: 'Basketball league',
		1: 'Bingo',
		2: 'Camels 6',
		3: 'Camels 8',
		4: 'Car Racing 6',
		5: 'Car Racing 8',
		6: 'Dogs 6 VR',
		7: 'Dogs 8',
		8: 'Dogs 8 VR',
		9: 'Football',
		10: 'Football cup',
		11: 'Horses 6',
		12: 'Horses 6 VR',
		13: 'Horses 8',
		14: 'Horses 8 VR',
		15: 'Speedway',
		16: 'Spin&Win',
		17: 'Spin&Win Deluxe',
		18: 'Tennis',
		19: 'Turbo football'
	},
	
	MESSAGE: {
		ACCOUNTS: {
			ADD: 'add',
			TRANSFER: 'transfer'
		}
	},
	
	YES_NO: {
		0: 'NO',
		1: 'YES',
	},
	
	ENABLE_DISABLE: {
		0: 'ENABLE',
		1: 'DISABLE',
	},
	
	COUNTRIES: {
		AF: "Afghanistan",
		AL: "Albania",
		DZ: "Algeria",
		AD: "Andorra",
		AO: "Angola",
		AG: "Antigua and Barbuda",
		AR: "Argentina",
		AM: "Armenia",
		AU: "Australia",
		AT: "Austria",
		AZ: "Azerbaijan",
		BS: "Bahamas",
		BH: "Bahrain",
		BD: "Bangladesh",
		BB: "Barbados",
		BY: "Belarus",
		BE: "Belgium",
		BZ: "Belize",
		BJ: "Benin",
		BT: "Bhutan",
		BO: "Bolivia",
		BA: "Bosnia and Herzegovina",
		BW: "Botswana",
		BR: "Brazil",
		BN: "Brunei",
		BG: "Bulgaria",
		BF: "Burkina Faso",
		BI: "Burundi",
		CV: "Cabo Verde",
		KH: "Cambodia",
		CM: "Cameroon",
		CA: "Canada",
		CF: "Central African Republic",
		TD: "Chad",
		CL: "Chile",
		CN: "China",
		CO: "Colombia",
		KM: "Comoros",
		CG: "Congo",
		CR: "Costa Rica",
		HR: "Croatia",
		CU: "Cuba",
		CY: "Cyprus",
		CZ: "Czech Republic",
		DK: "Denmark",
		DJ: "Djibouti",
		DM: "Dominica",
		DO: "Dominican Republic",
		TL: "East Timor (Timor-Leste)",
		EC: "Ecuador",
		EG: "Egypt",
		SV: "El Salvador",
		GQ: "Equatorial Guinea",
		ER: "Eritrea",
		EE: "Estonia",
		SZ: "Eswatini",
		ET: "Ethiopia",
		FJ: "Fiji",
		FI: "Finland",
		FR: "France",
		GA: "Gabon",
		GM: "Gambia",
		GE: "Georgia",
		DE: "Germany",
		GH: "Ghana",
		GR: "Greece",
		GD: "Grenada",
		GT: "Guatemala",
		GN: "Guinea",
		GW: "Guinea-Bissau",
		GY: "Guyana",
		HT: "Haiti",
		HN: "Honduras",
		HU: "Hungary",
		IS: "Iceland",
		IN: "India",
		ID: "Indonesia",
		IR: "Iran",
		IQ: "Iraq",
		IE: "Ireland",
		IL: "Israel",
		IT: "Italy",
		CI: "Ivory Coast",
		JM: "Jamaica",
		JP: "Japan",
		JO: "Jordan",
		KZ: "Kazakhstan",
		KE: "Kenya",
		KI: "Kiribati",
		KP: "Korea, North",
		KR: "Korea, South",
		XK: "Kosovo",
		KW: "Kuwait",
		KG: "Kyrgyzstan",
		LA: "Laos",
		LV: "Latvia",
		LB: "Lebanon",
		LS: "Lesotho",
		LR: "Liberia",
		LY: "Libya",
		LI: "Liechtenstein",
		LT: "Lithuania",
		LU: "Luxembourg",
		MG: "Madagascar",
		MW: "Malawi",
		MY: "Malaysia",
		MV: "Maldives",
		ML: "Mali",
		MT: "Malta",
		MH: "Marshall Islands",
		MR: "Mauritania",
		MU: "Mauritius",
		MX: "Mexico",
		FM: "Micronesia",
		MD: "Moldova",
		MC: "Monaco",
		MN: "Mongolia",
		ME: "Montenegro",
		MA: "Morocco",
		MZ: "Mozambique",
		MM: "Myanmar (Burma)",
		NA: "Namibia",
		NR: "Nauru",
		NP: "Nepal",
		NL: "Netherlands",
		NZ: "New Zealand",
		NI: "Nicaragua",
		NE: "Niger",
		NG: "Nigeria",
		MK: "North Macedonia (formerly Macedonia)",
		NO: "Norway",
		OM: "Oman",
		PK: "Pakistan",
		PW: "Palau",
		PA: "Panama",
		PG: "Papua New Guinea",
		PY: "Paraguay",
		PE: "Peru",
		PH: "Philippines",
		PL: "Poland",
		PT: "Portugal",
		QA: "Qatar",
		RO: "Romania",
		RU: "Russia",
		RW: "Rwanda",
		KN: "Saint Kitts and Nevis",
		LC: "Saint Lucia",
		VC: "Saint Vincent and the Grenadines",
		WS: "Samoa",
		SM: "San Marino",
		ST: "Sao Tome and Principe",
		SA: "Saudi Arabia",
		SN: "Senegal",
		RS: "Serbia",
		SC: "Seychelles",
		SL: "Sierra Leone",
		SG: "Singapore",
		SK: "Slovakia",
		SI: "Slovenia",
		SB: "Solomon Islands",
		SO: "Somalia",
		ZA: "South Africa",
		SS: "South Sudan",
		ES: "Spain",
		LK: "Sri Lanka",
		SD: "Sudan",
		SR: "Suriname",
		SE: "Sweden",
		CH: "Switzerland",
		SY: "Syria",
		TW: "Taiwan",
		TJ: "Tajikistan",
		TZ: "Tanzania",
		TH: "Thailand",
		TG: "Togo",
		TO: "Tonga",
		TT: "Trinidad and Tobago",
		TN: "Tunisia",
		TR: "Turkey",
		TM: "Turkmenistan",
		TV: "Tuvalu",
		UG: "Uganda",
		UA: "Ukraine",
		AE: "United Arab Emirates",
		GB: "United Kingdom",
		US: "United States of America",
		UY: "Uruguay",
		UZ: "Uzbekistan",
		VU: "Vanuatu",
		VA: "Vatican City (Holy See)",
		VE: "Venezuela",
		VN: "Vietnam",
		YE: "Yemen",
		ZM: "Zambia",
		ZW: "Zimbabwe"
	}
}
