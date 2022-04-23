_KS.errors = {
	REQUEST_FAILED: {
		ru: 'Не удалось выполнить запрос',
		en: 'Failed to complete request'
	},
	REQUEST_TIMEOUT: {
		ru: 'Превышено время ожидания запроса',
		en: 'Request timeout exceeded'
	},
	MALFORMED_RESPONSE: {
		ru: 'От сервера получен неверный ответ',
		en: 'Malformed response received from server'
	},
	RECORD_NOT_FOUND: {
		ru: 'Почта не найдена в хранилище',
		en: 'Email was not found in storage',
		action: 'fail',
		stop: false
	},
	BAD_TOKEN: {
		ru: 'Неверно указан параметр: Токен',
		en: 'Incorrect parameter: Token',
		action: 'die',
		instantly: true
	},
	BAD_KARMA: {
		ru: 'Вы перебрали слишком много почт и были временно заблокированы',
		en: 'You had too many emails and were temporarily blocked',
		action: 'die',
		instantly: false
	},
	BAD_SITE: {
		ru: 'Неверно указан параметр: Сайт',
		en: 'Incorrect parameter: Site',
		action: 'die',
		instantly: true
	},
	BAD_DOMAIN: {
		ru: 'Неверно указан параметр: Домены',
		en: 'Incorrect parameter: Domains',
		action: 'die',
		instantly: true
	},
	BAD_BALANCE: {
		ru: 'Недостаточно средств для совершения операции',
		en: 'Insufficient funds for the transaction',
		action: 'die',
		instantly: false
	},
	OUT_OF_STOCK: {
		ru: 'Запрошенные домены сейчас недоступны',
		en: 'The requested domains are not available now',
		action: 'fail',
		stop: false
	},
	SYSTEM_ERROR: {
		ru: 'Неизвестная, серверная ошибка',
		en: 'Unknown, server error',
		action: 'fail',
		stop: false
	},
	TIME_LIMIT_EXCEED: {
		ru: 'Достигнут лимит заказа почт в секунду',
		en: 'Email order limit per second has been reached',
		action: 'fail',
		stop: false
	},
	NO_ACTIVATION: {
		ru: 'Сервер не смог найти почту с указанными параметрами',
		en: 'The server could not find email with the specified parameters',
		action: 'fail',
		stop: false
	},
	ACTIVATION_CANCELED: {
		ru: 'Почта была закрыта на сервере',
		en: 'Email was closed on the server',
		action: 'fail',
		stop: false
	},
	WAIT_LINK: {
		ru: 'Сообщение не получено',
		en: 'Message not received',
		action: 'fail',
		stop: false
	},
	BAD_COMMENT: {
		ru: 'Неверно указан параметр: Текст комментария',
		en: 'Incorrect parameter: Comment text',
		action: 'fail',
		stop: false
	},
	DOMAIN_NOT_IN_BLACK_LIST: {
		ru: 'Указанный домен не находится в чёрном списке',
		en: 'The specified domain is not on the blacklist',
		action: 'fail',
		stop: false
	},
	'bad request': {
		ru: 'Отправлен неверный запрос',
		en: 'Invalid request sent',
		action: 'die',
		instantly: false
	},
	unknown: {
		ru: 'Неизвестная ошибка',
		en: 'Unknown error',
		action: 'fail',
		stop: false
	}
}
