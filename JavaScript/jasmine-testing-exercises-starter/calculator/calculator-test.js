
it('should calculate the monthly rate correctly', function () {
  const values = {amount: 10000, years: 5, rate: 2}
  expect(calculateMonthlyPayment(values)).toEqual("175.28")
});


it("should return a result with 2 decimal places", function() {
  const values = {amount: 10043, years: 8, rate: 5.8}
  expect(calculateMonthlyPayment(values)).toEqual(131.00)
});


it("should return 0.00 with a string rather than a number", function() {
  const values = {amount: '', years: 8, rate: 5.8}
  expect(calculateMonthlyPayment(values)).toEqual(0.00)
});