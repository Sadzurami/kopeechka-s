var email = GetInputConstructorValue('email', loader)
if (email['original'].length == 0) {
	Invalid(
		tr('The parameter "') + tr('Email address') + tr('" is not specified')
	)
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

var fromServer = $('#fromServer').is(':checked')
var strictMode = $('#strictMode').is(':checked')
try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#ks_close_email_code').html())({
			email: email['updated'],
			fromServer: fromServer,
			strictMode: strictMode,
			timeout: timeout['updated'],
			maxTime: maxTime['updated'],
			interval: interval['updated']
		})
	code = Normalize(code, 0)
	BrowserAutomationStudio_Append(
		'',
		BrowserAutomationStudio_SaveControls() + code,
		action,
		DisableIfAdd
	)
} catch (e) {}
