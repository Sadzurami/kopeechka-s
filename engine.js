_KS = {
	baseUrl: 'http://api.kopeechka.store',
	strictMode: false,
	debug: false,
	storage: new _KStorageLocal(),

	setDefaultSetting: function (ctxt) {
		if (!ctxt || !Object.keys(ctxt).length) return

		_KS.baseUrl = Boolean(ctxt.ssl)
			? 'https://api.kopeechka.store'
			: 'http://api.kopeechka.store'

		_KS.debug = Boolean(ctxt.debug)

		_KS.storage =
			ctxt.storage === 'local' || !ctxt.storage
				? new _KStorageLocal()
				: ctxt.storage === 'global'
				? new _KStorageGlobal()
				: ctxt.storage === 'resource'
				? new _KStorageresource()
				: fail('Storage ' + _KS.storage + ' is not implemented')

		if (ctxt.failErrors) {
			_KS.tools.setErrors({
				err: ctxt.failErrors,
				errType: 'fail',
				stop: Boolean(ctxt.failStop)
			})
		}
		if (ctxt.dieErrors) {
			_KS.tools.setErrors({
				err: ctxt.dieErrors,
				errType: 'die',
				instantly: Boolean(ctxt.dieInstantly)
			})
		}
		if (ctxt.ignoreErrors) _KS.tools.setErrors({ err: ctxt.ignoreErrors })

		if (ctxt.applyGlobally) {
			PSet('kopeechka', 'config', JSON.stringify(ctxt))
		}

		return
	},
	strict: function (ctxt) {
		_KS.strictMode = Boolean(ctxt)
		return
	},
	getBalance: function () {
		var ctxt = _arguments()

		var params = { token: ctxt.token }

		var timeout = Number(ctxt.timeout) || 5000
		var interval = Number(ctxt.interval) || 2000
		var maxTime = Number(ctxt.maxTime) || 60000

		var path = '/user-balance'

		var schema = {
			properties: {
				balance: {
					type: 'number'
				}
			},
			required: ['balance']
		}

		_call_function(_KS.request.make, {
			path: path,
			params: params,
			schema: schema,
			timeout: timeout,
			interval: interval,
			maxTime: maxTime
		})!

		candidate = _result_function()
		var response = candidate ? Number(candidate.balance) : null

		_function_return(response)
	},
	getEmail: function () {
		var ctxt = _arguments()

		var params = _KS.tools.cleanObject(ctxt, [
			'token',
			'site',
			'email',
			'mail_type',
			'sender',
			'regex',
			'investor',
			'subject',
			'clear'
		])

		params.soft = '7'
		params.clear = Number(params.clear) || 0
		params.investor = Number(params.investor) || 0

		var timeout = Number(ctxt.timeout) || 15000
		var interval = Number(ctxt.interval) || 3000
		var maxTime = Number(ctxt.maxTime) || 60000

		var path = params.email ? '/mailbox-reorder' : '/mailbox-get-email'

		var schema = {
			properties: {
				id: {
					type: 'string',
					minLength: 1
				},
				mail: {
					type: 'string',
					minLength: 3
				}
			},
			required: ['id', 'mail']
		}

		_call_function(_KS.request.make, {
			path: path,
			params: params,
			schema: schema,
			timeout: timeout,
			interval: interval,
			maxTime: maxTime
		})!

		candidate = _result_function()
		var response = candidate ? candidate.mail : null

		if (response) {
			_KS.storage.set(response, {
				id: candidate.id,
				token: params.token
			})
		}

		_function_return(response)
	},
	getMessage: function () {
		var ctxt = _arguments()

		var params = _KS.storage.get(ctxt.email)
		var response = { parsed: null, full: null }

		if (!params) {
			_KS.tools.errorsHandler('RECORD_NOT_FOUND', ctxt.email)
			_function_return(response)
		}

		params.full = Number(ctxt.full) || 0

		var timeout = Number(ctxt.timeout) || 15000
		var interval = Number(ctxt.interval) || 5000
		var maxTime = Number(ctxt.maxTime) || 60000

		var path = '/mailbox-get-message'

		var schema = {
			properties: {
				value: {
					type: 'string',
					minLength: 1
				},
				fullmessage: {
					type: 'string',
					minLength: 1
				}
			},
			required: [params.full ? 'fullmessage' : 'value']
		}

		_call_function(_KS.request.make, {
			path: path,
			params: params,
			schema: schema,
			timeout: timeout,
			interval: interval,
			maxTime: maxTime
		})!

		candidate = _result_function()
		response = {
			parsed: candidate && candidate.value ? candidate.value : null,
			full:
				candidate && candidate.fullmessage
					? candidate.fullmessage
					: null
		}

		_function_return(response)
	},
	closeEmail: function () {
		var ctxt = _arguments()

		var params = _KS.storage.get(ctxt.email)

		if (!params) {
			_KS.tools.errorsHandler('RECORD_NOT_FOUND', ctxt.email)
			_function_return()
		}

		_KS.storage.remove(ctxt.email)

		if (ctxt.fromServer) {
			var path = '/mailbox-cancel'

			var timeout = Number(ctxt.timeout) || 2000
			var interval = Number(ctxt.interval) || 1000
			var maxTime = Number(ctxt.maxTime) || 60000

			_call_function(_KS.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime
			})!
		}
		_function_return()
	},
	getDomains: function () {
		var ctxt = _arguments()

		var domains = ctxt.domains
		if (domains !== 'popular' && domains !== 'internal')
			_function_return([])

		var internalDomains = domains !== 'popular'
		var params = internalDomains
			? { token: ctxt.token, site: ctxt.site }
			: { popular: 1 }

		var minPrice = Number(ctxt.minPrice) || 0
		var maxPrice = Number(ctxt.maxPrice) || 1000

		var timeout = Number(ctxt.timeout) || 5000
		var interval = Number(ctxt.interval) || 1000
		var maxTime = Number(ctxt.maxTime) || 60000

		var path = internalDomains ? '/mailbox-get-domains' : '/mailbox-zones'

		var schema = internalDomains
			? {
					properties: {
						domains: {
							type: 'array'
						}
					},
					required: ['domains']
			  }
			: {
					properties: {
						popular: {
							type: 'array'
						}
					},
					required: ['popular']
			  }

		_call_function(_KS.request.make, {
			path: path,
			params: params,
			schema: schema,
			timeout: timeout,
			interval: interval,
			maxTime: maxTime
		})!

		candidate = _result_function()
		var response = candidate
			? internalDomains
				? candidate.domains
				: candidate.popular
						.filter(function (el) {
							return el.cost >= minPrice && el.cost <= maxPrice
						})
						.map(function (el) {
							return el.name
						})
			: null

		_function_return(response)
	}
}

_KS.setDefaultSetting(JSON.parse(P('kopeechka', 'config') || '""'))
