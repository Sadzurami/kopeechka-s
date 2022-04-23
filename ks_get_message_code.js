_KS.strict(<%= strictMode %>)
_call_function(_KS.getMessage, { 
  email: (<%= email %>),
  full: (<%= full %>),
  timeout:  (<%= timeout %>) * 1000,
  interval:  (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
var json = _result_function()
<%= variable %> = json['parsed']
<%= messageFull %> = json['full']