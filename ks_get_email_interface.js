<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "token",
		description: tr("Token"),
		default_selector: "string",
		disable_int: true,
		value_string: "",
		help: {
			description: tr("Token for API access, you can find it in your personal cabinet."),
			examples: [
				{code: "5e543256c480ac577d30f76f9120eb74"},
				{code: "c4ca4238a0b923820dcc509a6f75849b"},
				{code: "eccbc87e4b5ce2fe28308fd9f2a7baf3"}
			]
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "site",
		description: tr("Site"),
		default_selector: "string",
		disable_int: true,
		value_string: "",
		help: {
			description: tr("The site for which you are ordering email."),
			examples: [
				{code: "instagram.com"},
				{code: "https://twitter.com/"},
				{code: "https://ru-ru.facebook.com/"},
				{code: "instagram.com,facebook.com", description: tr("Get an email that can be used on multiple sites.") + " " +  tr("Must be separated by <code>,</code>.")}
			]
		}
	}) %>
	<%= _.template($('#block_start').html())({id:"Options", name: tr("Options"), description: tr("All fields of this group are optional")}) %>
		<%= _.template($('#input_constructor').html())({
			id: "mail_type",
			description: tr("Domains"),
			default_selector: "string",
			disable_int: true,
			value_string: "ALL",
			variants: [
			"ALL<br/><span style='color:rgb(85, 174, 255)'>" + tr("Service's personal domains") + "</span>",
			"REAL<br/><span style='color:rgb(85, 174, 255)'>" + tr("Well-known domains") + "</span>",
			"YANDEX<br/><span style='color:rgb(85, 174, 255)'>" + tr("Yandex domains group") + "</span>",
			"OUTLOOK<br/><span style='color:rgb(85, 174, 255)'>" + tr("Outlook/Hotmail group") + "</span>",
			"MAILCOM<br/><span style='color:rgb(85, 174, 255)'>" + tr("Mail.com domains group") + "</span>",
			"MAILRU<br/><span style='color:rgb(85, 174, 255)'>" + tr("Mail.ru domains group") + "</span>",
			"RAMBLER<br/><span style='color:rgb(85, 174, 255)'>" + tr("Rambler domains group") + "</span>",
			"GMX<br/><span style='color:rgb(85, 174, 255)'>" + tr("GMX domains group") + "</span>"
			],
			help: {
				description: tr("Domains or mail group names that you want to receive.") + " " + tr("The list of domains can be obtained using the \"get domains \" action."),
				examples: [
					{code: "YANDEX", description: tr("Yandex domains group") + "."},
					{code: "mail.ru", description: tr("One domain") + "."},
					{code: "yandex.ru,mail.ru,rambler.ua", description: tr("Several domains.") + " " + tr("Must be separated by <code>,</code>.")},
          {code: tr("leave blank"), description: tr("Allow service to select automatically.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "sender",
			description: tr("Sender"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("The sender you are expecting the message from."),
				examples: [
					{code: "noreply@facebook.com"},
					{code: "info@example.com,noreply@domain.com", description: tr("Multiple senders") + " " +  tr("if you are ordering email for multiple sites.") + " " + tr("Must be separated by <code>,</code>.") + " " + tr("The order should be the same as in the \"Site\" field.")},
          {code: tr("leave blank"), description: tr("Allow service to select automatically.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "subject",
			description: tr("Subject"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Message subject.") + " " + tr("One word is enough."),
				examples: [
          {code: tr("leave blank"), description: tr("Get the first message from the sender.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "email",
			description: tr("Email address"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Email address you received earlier."),
				examples: [
					{code: "somename@mail.ru", description: tr("Reorder email address.")},
          {code: tr("leave blank"), description: tr("Get new email address.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "regex",
			description: tr("Regular expression"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Regular expression applied to the message."),
				examples: [
					{code: "code:(.*)", description: tr("If the message is \"code:12345\", then after conversion you will get <code>12345</code>")},
					{code: "href=(.*)|,|code:(.*)", description: tr("Multiple regular expressions") + " " + tr("if you are ordering email for multiple sites.") + " " + tr("Must be separated by <code>|,|</code>.") + " " + tr("The order should be the same as in the \"Site\" field.")},
          {code: tr("leave blank"), description: tr("Server will parse the message automatically.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "soft",
			description: tr("Dev id"),
			default_selector: "string",
			value_string: "",
			help: {
				description: tr("Developer referral ID. You can find out about it in support."),
				examples: [
					{code: "55"},
					{code: "101"},
          {code: tr("leave blank"), description: tr("You have decided to share your money from lunches with the developer of this module. Thank you!")}
				]
			}
		}) %>
		<span data-preserve="true" data-preserve-type="check" data-preserve-id="clear">
			<input type="checkbox" id="clear" style="margin-left:25px"/> 
			<label for="clear"><span class="tr">Exclude email addresses with special characters</span> <code>- . _ +</code></label>
		</span>
		<br>
		<span data-preserve="true" data-preserve-type="check" data-preserve-id="investor">
			<input type="checkbox" id="investor" style="margin-left:25px"/> 
			<label for="investor" class="tr">Receive my email addresses</label>
		</span>
	<%= _.template($('#block_end').html())() %>	
  <%= _.template($('#block_start').html())({id:"Requests", name: tr("Requests delivery"), description: tr("It is recommended to leave the default settings, or increase them if you have a slow Internet connection")}) %>
		<%= _.template($('#input_constructor').html())({
			id: "timeout",
			description: tr("Timeout"),
			default_selector: "int",
			disable_string: true,
			value_number: 10,
			min_number:	1,
			max_number:	60,
			help: {
				description: tr("Maximum waiting time per request."),
				examples: [
					{code: 1, description: tr("Wait 1 second.")},
					{code: 5, description: tr("Wait 5 seconds.")},
					{code: 10, description: tr("Wait 10 seconds.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "interval",
			description: tr("Interval"),
			default_selector: "int",
			disable_string: true,
			value_number: 3,
			min_number: 1,
			max_number:	1200,
			help: {
				description: tr("Interval for sending requests."),
				examples: [
					{code: 1, description: tr("Send request every second.")},
					{code: 5, description: tr("Send request every 5 seconds.")},
					{code: 10, description: tr("Send request every 10 seconds.")}				
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "maxTime",
			description: tr("Time threshold"),
			default_selector: "int",
			disable_string: true,
			value_number: 60,
			min_number: 1,
			max_number:	1000000,
			help: {
				description: tr("Maximum execution time."),
				examples: [
					{code: 1, description: tr("Perform an action no more than 1 second.")},
					{code: 5, description: tr("Perform an action no more than 5 seconds.")},
					{code: 10, description: tr("Perform an action no more than 10 seconds.")}				
				]
			}
		}) %>
	<%= _.template($('#block_end').html())() %>
	<%= _.template($('#variable_constructor').html())({
		id: "Save",
		description: tr("Variable to save the result"),
		default_variable: "EMAIL",
		help: {
			description:tr("Email address") + ".",
			examples: [
				{code: "email@yandex.ru"},
				{code: 'null', description: tr("Failed to get email.")}
			]
		}
	}) %>
	<span data-preserve="true" data-preserve-type="check" data-preserve-id="strictMode">
		<input type="checkbox" id="strictMode" checked style="margin-left:25px"/> 
		<label for="strictMode" class="tr">Strict mode</label>
	</span>		
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Ordering a new or reusing an existing email address</div>
	<div class="tooltip-paragraph-fold"><span class="tr">On success, this action will return <code>string</code></span> <span class="tr">which contains email address.</span></div>
  <div class="tr tooltip-paragraph-fold">If the execution time expires, this action will return <code>null</code>.</div>
	<div class="tr tooltip-paragraph-fold">Regular expressions are applied at the server level.</div>
	<div class="tr tooltip-paragraph-fold">If <code>strict mode</code> id enabled - <code>Fail</code> action will be called when any common error occurs.</div>
	<div class="tr tooltip-paragraph-fold"><code>Fail</code> errors can be handled with <code>Ignore Errors</code> action.</div>
	<div class="tr tooltip-paragraph-fold">If <code>strict mode</code> is disabled - common errors will be ignored and action will be executed until success.</div>
	<div class="tooltip-paragraph-fold"><span class="tr"><code>Attention!</code></span> <span class="tr">Fatal errors, such as <code>BAD_BALANCE</code>, calls <code>End Script</code> action.</span></div>
  <div class="tr tooltip-paragraph-fold">The <code>End Script</code> behavior can't be handled.</div>
  <div class="tr tooltip-paragraph-fold">If you want to change the behavior for a specific error, use the <code>Default Settings</code> action.</div>
  <div class="tooltip-paragraph-fold"><a href="#" class="tr" onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3Jsxwtw');return false">More info about errors</a></div>
  <div class="tooltip-paragraph-fold"><a class="tr" href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3myvFtt');return false">More info about the API used here</a> # 1</div>
	<div class="tooltip-paragraph-fold"><a class="tr" href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3Hge6WV');return false">More info about the API used here</a> # 2</div>
  <div class="tooltip-paragraph-last-fold"><a class="tr" href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://kopeechka.store/panel');return false">My account</a></div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
<%= "<s" + "cript>" %>
		$(document).ready(function(){
				let ksOkButton = document.getElementById('ok')
				ksOkButton.style.backgroundColor = '#569bf7'
				ksOkButton.style.borderColor = '#46a5f9'
				let ksVariables = document.querySelectorAll(".variable-input");
				for (let i = 0; i < ksVariables.length; i++) {
					ksVariables[i].style.color = "#449ff1";
				}
		});
<%= "</" + "script>" %>