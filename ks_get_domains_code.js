_KS.strict(<%= strictMode %>)
_call_function(_KS.getDomains, { 
  domains : (<%= domains %>),
  token : (<%= token %>),
  site: (<%= site %>),
  minPrice: (<%= minPrice %>),
  maxPrice: (<%= maxPrice %>),
  timeout:  (<%= timeout %>) * 1000,
  interval:  (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()