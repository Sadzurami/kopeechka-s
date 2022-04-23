function _KStorage() {}
_KStorage.prototype.set = function () {
	fail('Storage method "set" should be implemented')
}
_KStorage.prototype.get = function () {
	fail('Storage method "get" should be implemented')
}
_KStorage.prototype.remove = function () {
	fail('Storage method "remove" should be implemented')
}

function _KStorageLocal() {
	_KStorage.call(this)
	this.db = this.db || {}
}
_KStorageLocal.prototype = Object.create(_KStorage.prototype)
_KStorageLocal.prototype.set = function (key, value) {
	return (this.db[md5(key)] = value)
}
_KStorageLocal.prototype.get = function (key) {
	return this.db[md5(key)] || ''
}
_KStorageLocal.prototype.remove = function (key) {
	delete this.db[md5(key)]
	return
}

function _KStorageGlobal() {
	_KStorage.call(this)
}
_KStorageGlobal.prototype = Object.create(_KStorage.prototype)
_KStorageGlobal.prototype.set = function (key, value) {
	return PSet('kopeechka', md5(key), JSON.stringify(value))
}
_KStorageGlobal.prototype.get = function (key) {
	return JSON.parse(P('kopeechka', md5(key)) || '""')
}
_KStorageGlobal.prototype.remove = function (key) {
	return PClear('kopeechka', md5(key))
}
_KStorageGlobal.prototype.clear = function (key) {
	var value = this.get('existingData')
	if (value.length) {
		var ts = Date.now()
		value = value.filter(function (el) {
			if (value.ts - ts > 900000) {
				this.remove(value.id)
				return false
			}
			return true
		})
		this.set('existingData', value)
		value = ts = void 0
	}
	return
}

function _KStorageresource() {
	_KStorage.call(this)
	if (P('kopeechka', 'KopeechkaEmails') !== 'true') {
		RCreate('KopeechkaEmails', 100000, 100000, 0, false, false)
		PSet('kopeechka', 'KopeechkaEmails', 'true')
	}
	this.db = RMap('KopeechkaEmails')
}
_KStorageresource.prototype = Object.create(_KStorage.prototype)
_KStorageresource.prototype.set = function (key, value) {
	this.db.insert(md5(key) + ':' + JSON.stringify(value))
	this.db.sync()
}
_KStorageresource.prototype.get = function (key) {
	key = md5(key) + ':'
	var list = this.db.toList().reverse()
	var value = ''
	var el = null
	for (var i = 0; i < list.length; i++) {
		el = list[i]
		if (el.indexOf(key) === 0) {
			value = JSON.parse(el.split(key).pop())
			break
		}
	}
	list = void 0
	return value
}
_KStorageresource.prototype.remove = function (key) {
	var value = this.get(key)
	if (value) {
		var index = this.db.indexOf(md5(key) + ':' + JSON.stringify(value))
		this.db.remove(index)
		this.db.sync()
	}
	return
}
