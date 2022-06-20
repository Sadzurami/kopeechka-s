var token = GetInputConstructorValue('token', loader)
if (token['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('Token') + tr('" is not specified'))
	return
}
var site = GetInputConstructorValue('site', loader)
if (site['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('Site') + tr('" is not specified'))
	return
}
var timeout = GetInputConstructorValue('timeout', loader)
if (timeout['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('Timeout') + tr('" is not specified'))
	return
}
var interval = GetInputConstructorValue('interval', loader)
if (interval['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('Interval') + tr('" is not specified'))
	return
}
var maxTime = GetInputConstructorValue('maxTime', loader)
if (maxTime['original'].length == 0) {
	Invalid(
		tr('The parameter "') + tr('Time threshold') + tr('" is not specified')
	)
	return
}

var mail_type = GetInputConstructorValue('mail_type', loader)
var sender = GetInputConstructorValue('sender', loader)
var subject = GetInputConstructorValue('subject', loader)
var email = GetInputConstructorValue('email', loader)
var regex = GetInputConstructorValue('regex', loader)
var soft = GetInputConstructorValue('soft', loader)

var clear = $('#clear').is(':checked')
var investor = $('#investor').is(':checked')
var strictMode = $('#strictMode').is(':checked')

var Save = this.$el.find('#Save').val().toUpperCase()
try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#ks_get_email_code').html())({
			token: token['updated'],
			site: site['updated'],
			mail_type: mail_type['updated'],
			sender: sender['updated'],
			subject: subject['updated'],
			email: email['updated'],
			regex: regex['updated'],
			soft: soft['updated'],
			clear: clear,
			investor: investor,
			strictMode: strictMode,
			timeout: timeout['updated'],
			maxTime: maxTime['updated'],
			interval: interval['updated'],
			variable: 'VAR_' + Save,
		})
	code = Normalize(code, 0)
	BrowserAutomationStudio_Append(
		'',
		BrowserAutomationStudio_SaveControls() + code,
		action,
		DisableIfAdd
	)
} catch (e) {}
