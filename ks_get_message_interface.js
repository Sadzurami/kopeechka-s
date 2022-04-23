<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "email",
		description: tr("Email address"),
		default_selector: "string",
		disable_int: true,
		value_string: "",
		help: {
			description: tr("Email address you received earlier."),
			examples: [
				{code: "somename@mail.ru"},
				{code: "simple.email@mail.com"},
				{code: "mydomain@example.com"}
			]
		}
	}) %>
  <span data-preserve="true" data-preserve-type="check" data-preserve-id="full">
    <input type="checkbox" id="full" style="margin-left:25px"/> 
    <label for="full" class="tr">Get full message anyway</label>
  </span>
  <%= _.template($('#block_start').html())({id:"Requests", name: tr("Requests delivery"), description: tr("It is recommended to leave the default settings, or increase them if you have a slow Internet connection")}) %>
		<%= _.template($('#input_constructor').html())({
			id: "timeout",
			description: tr("Timeout"),
			default_selector: "int",
			disable_string: true,
			value_number: 15,
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
			value_number: 5,
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
		default_variable: "MESSAGE_PARSED",
		help: {
			description:	tr("Parsed value from message"),
			examples: [
				{code: 'null', description: tr("Failed to get parsed message")}
		]
		}
	}) %>
	<%= _.template($('#variable_constructor').html())({
		id: "messageFull",
		description: tr("Variable to save the result"),
		default_variable: "MESSAGE_FULL",
		help: {
			description:	tr("Full message"),
			examples: [
				{code: 'null', description: tr("Failed to get full message")}
		]
		}
	}) %>
	<span data-preserve="true" data-preserve-type="check" data-preserve-id="strictMode">
		<input type="checkbox" id="strictMode" checked style="margin-left:25px"/> 
		<label for="strictMode" class="tr">Strict mode</label>
	</span>	
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Receiving an incoming message</div>
	<div class="tooltip-paragraph-fold"><span class="tr">On success, this action will return <code>string</code></span> <span class="tr">which contains parsed value from message.</span></div>
	<div class="tr tooltip-paragraph-fold">If the message could not be parsed, <code>null</code> will be returned.</div>
	<div class="tooltip-paragraph-fold"><span class="tr">The full message will be returned if the checkbox is checked or the message cannot be parsed.</span></div>
	<div class="tr tooltip-paragraph-fold">If the execution time expires, this action will return <code>null</code>.</div>
	<div class="tr tooltip-paragraph-fold">The server will parse the message correctly if you specify a regular message in <code>Get email address</code> action.</div>
	<div class="tr tooltip-paragraph-fold">If <code>strict mode</code> id enabled - <code>Fail</code> action will be called when any common error occurs.</div>
	<div class="tr tooltip-paragraph-fold"><code>Fail</code> errors can be handled with <code>Ignore Errors</code> action.</div>
	<div class="tr tooltip-paragraph-fold">If <code>strict mode</code> is disabled - common errors will be ignored and action will be executed until success.</div>
	<div class="tooltip-paragraph-fold"><span class="tr"><code>Attention!</code></span> <span class="tr">Fatal errors, such as <code>BAD_BALANCE</code>, calls <code>End Script</code> action.</span></div>
  <div class="tr tooltip-paragraph-fold">The <code>End Script</code> behavior can't be handled.</div>
  <div class="tr tooltip-paragraph-fold">If you want to change the behavior for a specific error, use the <code>Default Settings</code> action.</div>
  <div class="tooltip-paragraph-fold"><a href="#" class="tr" onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3Jsxwtw');return false">More info about errors</a></div>
  <div class="tooltip-paragraph-fold"><a class="tr" href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3JjSdI2');return false">More info about the API used here</a></div>
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