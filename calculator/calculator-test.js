
describe("testing monthly payment calculation function", function() {
  it('should calculate the monthly rate correctly', function () {
    const values = {amount: 26000, years: 5, rate: 6.2};
    expect(calculateMonthlyPayment(values)).toEqual("505.07")
});
})



it("should return a result with 2 decimal places", function() {
  const values = {amount: 50540, years: 10, rate: 9.3};
  expect(calculateMonthlyPayment(values)).toMatch(/\d+\.\d\d/)
});

it("testing 0 interest rate : special case", function() {
  const values = {amount: 40000, years: 4, rate: 0};
  expect(calculateMonthlyPayment(values)).toEqual("833.33");
});

