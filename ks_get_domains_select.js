var domains = GetInputConstructorValue('domains', loader)
if (domains['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('Domains') + tr('" is not specified'))
	return
}
var token = GetInputConstructorValue('token', loader)
var site = GetInputConstructorValue('site', loader)
var minPrice = GetInputConstructorValue('minPrice', loader)
var maxPrice = GetInputConstructorValue('maxPrice', loader)
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
var strictMode = $('#strictMode').is(':checked')
var Save = this.$el.find('#Save').val().toUpperCase()
try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#ks_get_domains_code').html())({
			domains: domains['updated'],
			token: token['updated'],
			site: site['updated'],
			minPrice: minPrice['updated'],
			maxPrice: maxPrice['updated'],
			strictMode: strictMode,
			timeout: timeout['updated'],
			maxTime: maxTime['updated'],
			interval: interval['updated'],
			variable: 'VAR_' + Save
		})
	code = Normalize(code, 0)
	BrowserAutomationStudio_Append(
		'',
		BrowserAutomationStudio_SaveControls() + code,
		action,
		DisableIfAdd
	)
} catch (e) {}
