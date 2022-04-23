_KS.strict(<%= strictMode %>)
_call_function(_KS.closeEmail, { 
  email:  (<%= email %>),
  fromServer: (<%= fromServer %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000, 
  maxTime: (<%= maxTime %>) * 1000
})!