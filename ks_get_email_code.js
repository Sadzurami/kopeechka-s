_KS.strict(<%= strictMode %>)
_call_function(_KS.getEmail, { 
  token:  (<%= token %>),
  site: (<%= site %>),
  mail_type: (<%= mail_type %>),
  sender: (<%= sender %>),
  subject: (<%= subject %>),
  email: (<%= email %>),
  regex: (<%= regex %>),
  clear: (<%= clear %>),
  soft: (<%= soft %>),
  investor: (<%= investor %>),
  timeout:  (<%= timeout %>) * 1000,
  interval:  (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()