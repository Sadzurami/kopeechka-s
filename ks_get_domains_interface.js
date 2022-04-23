<div class="container-fluid">
  <%= _.template($('#input_constructor').html())({
		id: "domains",
		description: tr("Domains"),
		default_selector: "string",
		disable_int: true,
		value_string: "popular",
    variants: [
    "popular<br/><span style='color:rgb(85, 174, 255)'>" + tr("Well-known domains") + "</span>",
    "internal<br/><span style='color:rgb(85, 174, 255)'>" + tr("Service's personal domains") + "</span>",
    ],
		help: {
			description: tr("The type of domains you want to get."),
			examples: [
				{code: "popular", description: "mail.ru, gmail.com, gmx.de"},
				{code: "internal", description: "joiket.space, hurentio.site, jkejoket.space"}
      ]
		}
	}) %>

	<%= _.template($('#block_start').html())({id:"SortByPrice", name: tr("Sorting by price"), description: ""}) %>
		<%= _.template($('#input_constructor').html())({
			id: "minPrice",
			description: tr("Min"),
			default_selector: "int",
			disable_string: true,
			value_number: 1,
			min_number: 1,
			max_number:	100000
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "maxPrice",
			description: tr("Max"),
			default_selector: "int",
			disable_string: true,
			value_number: 1000,
			min_number: 1,
			max_number:	100000
		}) %>
	<%= _.template($('#block_end').html())() %>
	<%= _.template($('#block_start').html())({id:"ExcludeDomains", name: tr("Exclude domains from my blacklist"), description: ""}) %>
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
				description: tr("Site for which to exclude the blacklist."),
				examples: [
					{code: "instagram.com"},
					{code: tr("leave blank"), description: tr("Get all available domains.")}
				]
			}
		}) %>
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
		default_variable: "KS_DOMAINS",
		help: {
			description:	tr("Domains"),
			examples: [
				{code: "['email@yandex.ru','simple@domain.com']"},
				{code: '[]', description: tr("No domains available.")},
				{code: 'null', description: tr("Failed to get domains.")}
			]
		}
	}) %>
	<span data-preserve="true" data-preserve-type="check" data-preserve-id="strictMode">
		<input type="checkbox" id="strictMode" checked style="margin-left:25px"/> 
		<label for="strictMode" class="tr">Strict mode</label>
	</span>		
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Get available domains</div>
	<div class="tooltip-paragraph-fold"><span class="tr">On success, this action will return <code>list</code></span> <span class="tr">which contains available to order domains.</span></div>
	<div class="tr tooltip-paragraph-fold">If there are no domains available an empty <code>list</code> will be returned.</div>
  <div class="tr tooltip-paragraph-fold">If the execution time expires, this action will return <code>null</code>.</div>
	<div class="tr tooltip-paragraph-fold">If <code>strict mode</code> id enabled - <code>Fail</code> action will be called when any common error occurs.</div>
	<div class="tr tooltip-paragraph-fold"><code>Fail</code> errors can be handled with <code>Ignore Errors</code> action.</div>
	<div class="tr tooltip-paragraph-fold">If <code>strict mode</code> is disabled - common errors will be ignored and action will be executed until success.</div>
	<div class="tooltip-paragraph-fold"><span class="tr"><code>Attention!</code></span> <span class="tr">Fatal errors, such as <code>BAD_BALANCE</code>, calls <code>End Script</code> action.</span></div>
  <div class="tr tooltip-paragraph-fold">The <code>End Script</code> behavior can't be handled.</div>
  <div class="tr tooltip-paragraph-fold">If you want to change the behavior for a specific error, use the <code>Default Settings</code> action.</div>
  <div class="tooltip-paragraph-fold"><a href="#" class="tr" onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3Jsxwtw');return false">More info about errors</a></div>
  <div class="tooltip-paragraph-fold"><a class="tr" href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3eqIcuu');return false">More info about the API used here</a> # 1</div>
	<div class="tooltip-paragraph-fold"><a class="tr" href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://bit.ly/3pqMkkA');return false">More info about the API used here</a> # 2</div>
  <div class="tooltip-paragraph-last-fold"><a class="tr" href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://kopeechka.store/panel');return false">My account</a></div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
<%= "<s" + "cript>" %>
		function switchVisible() {
			let domainsMode = $('#domains').val()
			let excludeDomainsBlock = document.querySelector("#ExcludeDomainsCheck")
			let excludeDomainsInner = document.querySelector("#ExcludeDomainsBlock")

			let priceSortingBlock = document.querySelector("#SortByPriceCheck")
			let priceSortingInner = document.querySelector("#SortByPriceBlock")

			excludeDomainsBlock.parentNode.style.display = domainsMode === 'internal' ? 'block' : 'none'
			excludeDomainsInner.style.display = domainsMode === 
			'internal' && excludeDomainsBlock.checked 
			? 'block' 
			: 'none'

			priceSortingBlock.parentNode.style.display = domainsMode === 'popular' ? 'block' : 'none'
			priceSortingInner.style.display = 
			domainsMode === 'popular' && priceSortingBlock.checked 
			? 'block' 
			: 'none'
		};
		$(document).ready(function(){
			document.querySelector("#SortByPriceCheck").parentNode.style.marginBottom = '8px'
			switchVisible()
			$('#domains').on('focusout', switchVisible)

			let ksOkButton = document.getElementById('ok')
			ksOkButton.style.backgroundColor = '#569bf7'
			ksOkButton.style.borderColor = '#46a5f9'
			let ksVariables = document.querySelectorAll(".variable-input")
			for (let i = 0; i < ksVariables.length; i++) {
				ksVariables[i].style.color = "#449ff1"
			}		
		});
<%= "</" + "script>" %>