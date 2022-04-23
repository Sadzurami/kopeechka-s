_KS.tools = {
	cleanObject: function (object, props) {
		if (!object || !Object.keys(object).length) return {}
		props = props || Object.keys(object)
		var _ctxt = {}
		Object.keys(object).forEach(function (prop) {
			if (
				object.hasOwnProperty(prop) &&
				object[prop] &&
				~props.indexOf(prop)
			) {
				_ctxt[prop] = object[prop]
			}
		})
		return _ctxt
	},
	typeValid: function (el, type) {
		switch (type) {
			case 'string':
				return Object.prototype.toString.call(el) === '[object String]'
			case 'array':
				return Object.prototype.toString.call(el) === '[object Array]'
			case 'number':
				return typeof el === 'number'
			case 'object':
				return Object.prototype.toString.call(el) === '[object Object]'
			default:
				return false
		}
	},
	JSONload: function (string) {
		_ctxt = null
		try {
			_ctxt = JSON.parse(string)
		} catch (e) {}
		return _ctxt
	},
	reduceString: function (string) {
		return string ? string.toString().trim() : ''
	},
	errorsHandler: function (code, text) {
		code = _KS.tools.reduceString(code)

		var errorObj = _KS.errors.hasOwnProperty(code)
			? _KS.errors[code]
			: _KS.errors['unknown']

		var msg = errorObj[_K] || errorObj['ru']

		_KS.tools.log('●' + ' ' + msg + (text ? ' | ' + text : ''))

		msg = 'Kopeechka: ' + msg

		if (errorObj.action === 'fail' && _KS.strictMode) {
			http_client_set_fail_on_error(true)
			_switch_http_client_main()
			fail(msg, Boolean(errorObj.stop))
		}
		if (errorObj.action === 'die') {
			die(msg, Boolean(errorObj.instantly))
		}

		return
	},
	setErrors: function (ctxt) {
		if (!ctxt.err) return
		;(_KS.tools.typeValid(ctxt.err, 'array')
			? ctxt.err
			: ctxt.err.split(',')
		).forEach(function (el) {
			_KS.errors[el] = _KS.errors[el] || {}
			_KS.errors[el].action = ctxt.errType
			_KS.errors[el].stop = Boolean(ctxt.stop)
			_KS.errors[el].instantly = Boolean(ctxt.instantly)
		})
	},
	log: function (ruText, enText) {
		if (_KS.debug) {
			enText = enText || ruText
			var msg = _K === 'ru' ? ruText : enText
			msg = _KS.tools.typeValid(msg, 'array') ? msg.join(' | ') : msg
			_info('[Kopeechka debug] ' + msg)
		}
	},
	sleep: function () {
		var sleepTime = Object(_arguments())['time'] || 1000
		_KS.tools.log('● Пауза ' + sleepTime, '● Pause ' + sleepTime)
		sleep(sleepTime)!
	}
}
