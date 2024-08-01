export const LOADING = 1000

export const USER_TYPE = {
  user: 0,
  cashbox: 1,
}

export const USER_VERIFY = {
  0: 'not',
  1: 'verification',
  2: 'rejected',
  3: 'verified',
}

export const VIDEO_TYPE = {
  iframe:   0,
  youtube:  1,
  flow:     2,
  picture:  3,
}

export const GAME_TIME = {
  START_TIMER: 3600000,
  START_ANNOUNCEMENT: 10000,
}

export const GAME_STATUS = {
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  PROGRESS: 'PROGRESS'
}

export const VOUCHER_STATUS = {
  0: 'new',
  1: 'paid',
  2: 'expired',
  3: 'cancelled'
}

export const PRINT_STATUS = {
  'ticket_payout':          1,
  'ticket_cancellation':    2,
  'ticket_reprint':         3,
  'create_voucher':         4,
  'create_voucher_reprint': 5,
  'voucher_payout':         6,
  'reprint_voucher_payout': 7,
  'successful_deposit':     8,
  'report_cashier':         9,
  'master_report':          10,
  'user_create':            11,
}

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1280
}

export const PAYEMENT_TYPE = {
  money: 0,
  bonus: 1
}

export const TICKET_TYPE = {
  single: 0,
  multi: 1,
}

export const STATUS_TYPE = {
  0: 'pending',
  1: 'confirmed',
  2: 'cancelled',
  3: 'lose',
  4: 'win_not_paid',
  5: 'win_paid',
  6: 'jackpot_winner'
}

export const BET_TYPE = {
  1: 101, // even
  2: 102, // odd
  3: 103, // equally
}

export const NAVIGATION = {
  home: {
    icon: 'fa-solid fa-house',
    link: '/',
    text: 'navigation.home',
  },
  all_games: {
    icon: 'fa-solid fa-dice',
    link: '/',
    text: 'navigation.all_games',
  },
  login: {
    icon: 'fa-solid fa-user',
    link: '/login',
    text: 'navigation.login',
  },
  registration: {
    icon: 'fa-solid fa-user-plus',
    link: '/registration',
    text: 'navigation.registration',
  },
  auth_recovery: {
    icon: 'fa-solid fa-user-lock',
    link: '/auth-recovery',
    text: 'navigation.auth_recovery',
  },
  check_ticket: {
    icon: 'fa-solid fa-ticket',
    link: '/check-ticket',
    text: 'navigation.check_ticket',
  },
  settings: {
    icon: 'fa-solid fa-gear',
    link: '/settings',
    text: 'navigation.settings',
  },
  broadcast: {
    icon: 'fa-solid fa-tv',
    link: '/broadcast',
    text: 'navigation.broadcast',
  },
  news: {
    icon: 'fa-solid fa-newspaper',
    link: '/news',
    text: 'navigation.news',
  },
  about: {
    icon: 'fa-solid fa-circle-info',
    link: '/about',
    text: 'navigation.about',
  },
  contacts: {
    icon: 'fa-solid fa-phone',
    link: '/contacts',
    text: 'navigation.contacts',
  },
  faq: {
    icon: 'fa-solid fa-message',
    link: '/faq',
    text: 'navigation.faq',
  },
  support: {
    icon: 'fa-solid fa-headset',
    link: '/support',
    text: 'navigation.support',
  }
}

export const ROUTES_CASHBOX = {
  account: {
    icon: 'fa-solid fa-user',
    text: 'cashbox.main',
    link: '/cashbox'
  },
  tickets: {
    icon: 'fa-solid fa-ticket',
    text: 'cashbox.tickets',
    link: '/cashbox/tickets-history'
  },
  profile: {
    icon: 'fa-solid fa-user-gear',
    text: 'cashbox.profile',
    link: '/cashbox/profile'
  },
  reports: {
    icon: 'fa-solid fa-file',
    text: 'cashbox.reports',
    link: '/cashbox/reports',
  },
  players: {
    icon: 'fa-solid fa-users',
    text: 'cashbox.players',
    link: '/cashbox/players',
  },
  voucher: {
    icon: 'fa-solid fa-barcode',
    text: 'cashbox.voucher',
    link: '/cashbox/voucher',
  }
}

export const ROUTES_USER = {
  account: {
    icon: 'fa-solid fa-user',
    text: 'account.main',
    link: '/account'
  },
  wallet: {
    icon: 'fa-solid fa-wallet',
    text: 'wallet',
    link: '/account/wallet'
  },
  bonuses: {
    icon: 'fa-solid fa-circle-dollar-to-slot',
    text: 'bonuses',
    link: '/account/bonuses'
  },
  tickets: {
    icon: 'fa-solid fa-ticket',
    text: 'account.tickets',
    link: '/account/tickets'
  },
  promocodes: {
    icon: 'fa-solid fa-barcode',
    text: 'promocodes',
    link: '/account/promocodes'
  },
  friends: {
    icon: 'fa-solid fa-people-group',
    text: 'account.friends',
    link: '/account/friends'
  },
  profile: {
    icon: 'fa-solid fa-user-gear',
    text: 'account.profile',
    link: '/account/profile'
  },
  subscriptions: {
    icon: 'fa-solid fa-bell',
    text: 'account.subscriptions',
    link: '/account/subscriptions'
  },
  stocks: {
    icon: 'fa-solid fa-percent',
    text: 'account.stocks',
    link: '/account/stocks'
  }
}

export const SPORTS_LOTTO_FACTORS = [
  { count: 7, factor: 1 },
  { count: 8, factor: 8 },
  { count: 9, factor: 36 },
  { count: 10, factor: 120 },
  { count: 11, factor: 330 },
  { count: 12, factor: 792 },
  { count: 13, factor: 1716 },
  { count: 14, factor: 3432 },
  { count: 15, factor: 6435 },
  { count: 16, factor: 11440 },
  { count: 17, factor: 19448 },
  { count: 18, factor: 31824 },
  { count: 19, factor: 50388 },
]