<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "storage",
		description: tr("Storage model"),
		default_selector: "string",
		disable_int: true,
		value_string: "local",
    variants: [
			"local<br/><span style='color:rgb(85, 174, 255)'>" + tr("Store locally") + "</span>", 
			"global<br/><span style='color:rgb(85, 174, 255)'>" + tr("Store globally") + "</span>", 
			"resource<br/><span style='color:rgb(85, 174, 255)'>" + tr("Store in resource") + "</span>"]
	}) %>
	<span class='tr' id='storageAttention' style="margin-left:25px;margin-bottom: 4px"><code>Be very careful using this type of storage. Read more in the description below.</code></span>
	<%= _.template($('#block_start').html())({id:"ReassigningErrors", name: tr("Reassigning errors"), description: tr("It is recommended to leave the default settings")}) %>
		<%= _.template($('#input_constructor').html())({
			id: "failErrors",
			description: "Fail",
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Error codes that calls <code>Fail</code> action."),
				examples: [
					{code: "OUT_OF_STOCK"},
					{code: "TIME_LIMIT_EXCEED,SYSTEM_ERROR", description: tr("Multiple error codes.") + " " + tr("Must be separated by <code>,</code>.") },
					{code: "['TIME_LIMIT_EXCEED','SYSTEM_ERROR']", description: tr("Multiple error codes.") },
				]
			}
		}) %>
		<span data-preserve="true" data-preserve-type="check" data-preserve-id="failStop">
			<input type="checkbox" id="failStop" style="margin-left:25px"/> 
			<label for="failStop" class="tr">Dont restart thread.</label>
		</span>
		<br>
		<%= _.template($('#input_constructor').html())({
			id: "dieErrors",
			description: tr("Script End"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Error codes that calls <code>Script End</code> action."),
				examples: [
					{code: "BAD_BALANCE"},
					{code: "BAD_DOMAIN,BAD_SITE", description: tr("Multiple error codes.") + " " + tr("Must be separated by <code>,</code>.") },
					{code: "['BAD_DOMAIN','BAD_SITE']", description: tr("Multiple error codes.") },
				]
			}
		}) %>
		<span data-preserve="true" data-preserve-type="check" data-preserve-id="dieInstantly">
			<input type="checkbox" id="dieInstantly" style="margin-left:25px"/> 
			<label for="dieInstantly" class="tr">Finish script instantly.</label>
		</span>
		<br>
		<%= _.template($('#input_constructor').html())({
			id: "ignoreErrors",
			description: tr("Ignore Errors"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Error codes to ignore."),
				examples: [
					{code: "WAIT_LINK"},
					{code: "REQUEST_FAILED,REQUEST_TIMEOUT", description: tr("Multiple error codes.") + " " + tr("Must be separated by <code>,</code>.") },
					{code: "['REQUEST_FAILED','REQUEST_TIMEOUT']", description: tr("Multiple error codes.") },
				]
			}
		}) %>
	<%= _.template($('#block_end').html())() %>
	<span data-preserve="true" data-preserve-type="check" data-preserve-id="ssl">
		<input type="checkbox" id="ssl" style="margin-left:25px"/> 
		<label for="ssl" class="tr">Use secure SSL connection</label>
	</span>
	<br>
	<span data-preserve="true" data-preserve-type="check" data-preserve-id="debug">
		<input type="checkbox" id="debug" style="margin-left:25px"/> 
		<label for="debug" class="tr">Enable debug mode</label>
	</span>
	<br>
	<span data-preserve="true" data-preserve-type="check" data-preserve-id="applyGlobally">
		<input type="checkbox" id="applyGlobally" style="margin-left:25px"/> 
		<label for="applyGlobally" class="tr">Apply globally</label>
	</span>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Set default settings</div>
	<div class="tr tooltip-paragraph-fold">You can apply this action to the current thread or to all new threads.</div>
	<div class="tr tooltip-paragraph-fold">It is good practice to use this action at the beginning of the thread or in the "OnApplicationStart" function.</div>
	<div class="tr tooltip-paragraph-fold">Module stores emails data in RAM.</div>
	<div class="tr tooltip-paragraph-fold">Depending on your tasks you can choose the storage model: local, global, resource.</div>
	<div class="tooltip-paragraph-fold"><code>local</code> - <span class="tr">This threads emails will not be available to other threads.</span></div>
	<div class="tooltip-paragraph-fold"><code>global</code> - <span class="tr">All threads can access any email data in this storage.</span></div>
	<div class="tooltip-paragraph-fold"><code>resource</code> - <span class="tr">Same as "global" model, but a bit slower.</span></div>
	<div class="tr tooltip-paragraph-fold"><code>Storage models "global" and "resource" cannot be cleared automatically.</code></div>
	<div class="tr tooltip-paragraph-fold">To avoid memory leaks using "global" and "resource" models, it is necessary to close the email.</div>
	<div class="tr tooltip-paragraph-fold">The "local" storage model is cleared automatically when the thread ends.</div>
  <div class="tooltip-paragraph-last-fold">
		<a href="#" class="tr" onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3Jsxwtw');return false">More info about errors</a>
	</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
<%= "<s" + "cript>" %>
		storageAttention = () => {
			let storageVal = document.querySelector('#storage').value
			let storageAttentionBlock = document.querySelector('#storageAttention')
			storageAttentionBlock.style.display = 
			storageVal === 'global' || storageVal === 'resource' 
			?	'block'
			: 'none'
		}
		$(document).ready(function(){
			storageAttention()
			$('#storage').on('focusout',	storageAttention)
			let ksOkButton = document.getElementById('ok')
			ksOkButton.style.backgroundColor = '#569bf7'
			ksOkButton.style.borderColor = '#46a5f9'
			let ksVariables = document.querySelectorAll(".variable-input");
			for (let i = 0; i < ksVariables.length; i++) {
				ksVariables[i].style.color = "#449ff1";
			}
			});
<%= "</" + "script>" %>