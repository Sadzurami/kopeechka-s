_KS.request = {
	make: function () {
		var ctxt = _arguments()

		var params = _KS.tools.cleanObject(ctxt.params || {})
		var path = ctxt.path || ''
		var baseUrl = _KS.baseUrl

		var url = baseUrl + path
		if (Object.keys(params).length) {
			url += '?' + _KS.request.serialize(params) + '&type=JSON&api=2.0'
		}

		var schema = ctxt.schema

		var timeout = Number(ctxt.timeout) || 10000
		var maxTime = (Number(ctxt.maxTime) || 60000) + Date.now()
		var interval = Number(ctxt.interval) || 2000

		var response = null

		_do(function () {
			var timeLeft = maxTime - Date.now()
			if (timeLeft - interval < 0) _break()

			_if(_iterator() % 2 === 0, function () {
				_call_function(_KS.tools.sleep, { time: interval })!
				_next('function')
			})!

			_KS.tools.log(
				'● Осталось времени: ' + timeLeft,
				'● Time left: ' + timeLeft
			)

			_call_function(_KS.request.send, {
				url: url,
				timeout: timeout,
				maxTime: timeLeft,
				interval: interval
			})!

			var candidate = _result_function()
			if (!candidate || !_KS.tools.typeValid(candidate, 'object')) {
				_next('function')
			}

			var resValid =
				candidate.status === 'OK' &&
				_KS.request.validate(candidate, schema)

			if (resValid) {
				response = candidate
				_break()
			}

			var errorCode =
				candidate.status === 'ERROR' && candidate.value
					? candidate.value
					: 'MALFORMED_RESPONSE'

			_KS.tools.errorsHandler(errorCode)
		})!

		_function_return(response)
	},
	send: function () {
		var ctxt = _arguments()

		var url = _KS.tools.reduceString(ctxt.url)

		var timeout = Number(ctxt.timeout) || 10000
		var maxTime = (Number(ctxt.maxTime) || 60000) + Date.now()
		var interval = Number(ctxt.interval) || 2000

		var headers =
			'User-Agent: KopeechkaSBAS/1.7\r\nAccept: application/json\r\nAccept-Encoding: gzip, deflate\r\nConnection: keep-alive'

		var response = null
		var responseTime = null

		_switch_http_client_internal()
		http_client_set_fail_on_error(false)

		_do(function () {
			var timeLeft = maxTime - Date.now()
			if (timeLeft - interval < 0) _break()

			_if(_iterator() > 1, function () {
				_call_function(_KS.tools.sleep, { time: interval })!
			})!

			_call(function () {
				_on_fail(function () {
					VAR_LAST_ERROR = _result()
					VAR_ERROR_ID = ScriptWorker.GetCurrentAction()
					VAR_WAS_ERROR = false
					_break(1, true)
				})

				CYCLES.Current().RemoveLabel('function')

				var requestTimeout =
					timeLeft < timeout
						? timeLeft
						: timeout < 60000
						? timeout
						: 60000

				_KS.tools.log('↑ Запрос: ' + url, '↑ Request: ' + url)
				_KS.tools.log(
					'● Время ожидания ответа: ' + requestTimeout,
					'● Response timeout: ' + requestTimeout
				)

				responseTime = Date.now()
				general_timeout_next(requestTimeout)
				http_client_get2(url, {
					method: 'GET',
					headers: headers
				})!
			}, null)!

			if (http_client_was_error() || VAR_WAS_ERROR) {
				_KS.tools.errorsHandler(
					VAR_WAS_ERROR ? 'REQUEST_TIMEOUT' : 'REQUEST_FAILED'
				)
			} else {
				responseTime = Date.now() - responseTime
				var statusCode = http_client_status()
				var contentType = http_client_header('Content-Type')
				var body = http_client_content('utf-8')

				_KS.tools.log(
					[
						'↓ Время ответа: ' + responseTime,
						'Cтатус: ' + statusCode,
						'Тип содержимого: ' + contentType
					],
					[
						'↓ Response time: ' + responseTime,
						'Status: ' + statusCode,
						'Content-type: ' + contentType
					]
				)
				_KS.tools.log('↓ Ответ: ' + body, '↓ Response: ' + body)

				var resValid =
					statusCode === 200 &&
					contentType.indexOf('application/json') === 0 &&
					body

				var candidate = resValid ? _KS.tools.JSONload(body) : null
				if (candidate) {
					response = candidate
					_break()
				}

				if (statusCode <= 500) {
					_KS.tools.errorsHandler('SYSTEM_ERROR')
				} else if (statusCode <= 400) {
					_KS.tools.errorsHandler('bad request')
				} else {
					_KS.tools.errorsHandler('MALFORMED_RESPONSE')
				}
			}
		})!

		http_client_set_fail_on_error(true)
		_switch_http_client_main()

		_function_return(response)
	},
	serialize: function (object) {
		var _ctxt = []
		for (var prop in object)
			if (object.hasOwnProperty(prop)) {
				_ctxt.push(
					encodeURIComponent(prop) +
						'=' +
						encodeURIComponent(object[prop])
				)
			}
		return _ctxt.join('&')
	},
	validate: function (object, schema) {
		if (!_KS.tools.typeValid(object, 'object')) return false
		if (!schema) return true
		if (!_KS.tools.typeValid(schema, 'object')) return false
		if (!schema.properties) return false

		var properties = schema.properties
		var required = schema.required || []
		var valid = true

		for (var prop in properties) {
			valid = object.hasOwnProperty(prop)

			if (valid && properties[prop].type) {
				valid = _KS.tools.typeValid(object[prop], properties[prop].type)
			}

			if (valid && properties[prop].minLength) {
				try {
					valid = object[prop].length >= +properties[prop].minLength
				} catch (e) {
					valid = false
				}
			}

			if (!valid && ~required.indexOf(prop)) break
		}

		return valid
	}
}
