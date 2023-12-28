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
	PLAYER_TYPE: {
		0: 'ANY',
		1: 'SHOP',
		2: 'WEB',
	}
}
