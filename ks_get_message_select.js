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
var full = $('#full').is(':checked')
var strictMode = $('#strictMode').is(':checked')
var messageFull = this.$el.find('#messageFull').val().toUpperCase()
var Save = this.$el.find('#Save').val().toUpperCase()
try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#ks_get_message_code').html())({
			email: email['updated'],
			full: full,
			strictMode: strictMode,
			timeout: timeout['updated'],
			maxTime: maxTime['updated'],
			interval: interval['updated'],
			variable: 'VAR_' + Save,
			messageFull: 'VAR_' + messageFull
		})
	code = Normalize(code, 0)
	BrowserAutomationStudio_Append(
		'',
		BrowserAutomationStudio_SaveControls() + code,
		action,
		DisableIfAdd
	)
} catch (e) {}
