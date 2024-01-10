describe("testing adding payments ot allPayments and update's tab", function() {
    beforeEach(function() {
        billAmtInput.value = "113";
        tipAmtInput.value = "13";
        allPayments =  {};
        paymentId = 0;
        paymentTbody.innerHTML = "";
    });
    
    it("Should add a payment to the payment tab correctly", function() {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        let curPayment = allPayments["payment" + paymentId];
        expect(curPayment.billAmt).toEqual("113");
        expect(curPayment.tipAmt).toEqual("13");

        let addedPaymentRow = paymentTbody.querySelector("tr");
        expect(addedPaymentRow.children.length).toEqual(3);
        expect(addedPaymentRow.firstChild.textContent).toEqual("$113")
    });

    afterEach(function() {
        billAmtInput.value = "";
        tipAmtInput.value = "";
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = "";
    });
});

describe("testing if creates payment object + returns undefined in error case", function() {
    it("should return a payment object for a valid input", function() {
        let values = [[113, 13], [50, 5], [29, 2], [150, 25]];
        values.forEach(input => {
            billAmtInput.value = input[0];
            tipAmtInput.value = input[1];
            let payment = createCurPayment();
            expect(payment).toBeDefined();
            expect(payment.billAmt).toEqual(input[0].toString());
            expect(payment.tipAmt).toEqual(input[1].toString());
        });
    });
    it("should return undefined for invalid inputs", function() {
        let values = [["aqsdn", "112"], ["aze", "25485474qsdc"], ["sn,gjr", "zejf"]];
        values.forEach(input => {
            billAmtInput.value = input[0];
            tipAmtInput.value = input[1];
            let payment = createCurPayment();
            expect(payment).toBeUndefined();
        });
    });
});

describe("testing if line in payment tab is correctly appended", function() {
    beforeEach(function() {
        paymentTbody.innerHTML = "";
    });
    it("should append a line to the payment tab", function() {
        let paymentObj = {
            billAmt: "124",
            tipAmt: "15",
            tipPercent: "15"

        };
        appendPaymentTable(paymentObj);
        let addedPaymentRows = paymentTbody.querySelectorAll("tr");
        expect(addedPaymentRows.length).toEqual(1);
        let addedRow = addedPaymentRows[0];
        expect(addedRow.children.length).toEqual(3);
        expect(addedRow.firstChild.textContent).toEqual("$124");
    });
    afterEach(function() {
        paymentTbody.innerHTML = "";
    })
});

describe("testing payment update", function() {
    beforeEach(function() {
        let allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = "";
    });

    it("should display and calculate payments properly", function() {
        allPayments["payment1"] = {
            billAmt: "100",
            tipAmt: "10",
            tipPercent: "5",
        };
        allPayments["payment2"] = {
            billAmt: "65",
            tipAmt: "5",
            tipPercent: "5",
        };
        updateSummary();
        expect(summaryTds[0].innerHTML).toEqual("$165");
        expect(summaryTds[1].innerHTML).toEqual("$15");
        expect(summaryTds[2].innerHTML).toEqual("5%");
    });
    afterEach(function() {
        paymentTbody.innerHTML = "";
        allPayments = {};
        paymentId = 0;
    });
});