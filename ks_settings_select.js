var storage = GetInputConstructorValue('storage', loader)
if (storage['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('Storage') + tr('" is not specified'))
	return
}

var failErrors = GetInputConstructorValue('failErrors', loader)
var failStop = $('#failStop').is(':checked')
var dieErrors = GetInputConstructorValue('dieErrors', loader)
var dieInstantly = $('#dieInstantly').is(':checked')
var ignoreErrors = GetInputConstructorValue('ignoreErrors', loader)

var ssl = $('#ssl').is(':checked')
var debug = $('#debug').is(':checked')
var applyGlobally = $('#applyGlobally').is(':checked')
try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#ks_settings_code').html())({
			storage: storage['updated'],
			failErrors: failErrors['updated'],
			failStop: failStop,
			dieErrors: dieErrors['updated'],
			dieInstantly: dieInstantly,
			ignoreErrors: ignoreErrors['updated'],
			ssl: ssl,
			debug: debug,
			applyGlobally: applyGlobally
		})
	code = Normalize(code, 0)
	BrowserAutomationStudio_Append(
		'',
		BrowserAutomationStudio_SaveControls() + code,
		action,
		DisableIfAdd
	)
} catch (e) {}
