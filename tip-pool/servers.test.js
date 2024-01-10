describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {

    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  afterEach(function() {
    serverTbody.innerHTML = "";
    serverId = 0;
    allServers = {};
  });
});

describe("Testing update of array with udateServerTable", function() {
  beforeEach(function(){ 
    serverNameInput.value = "Bob";
    submitServerInfo();
  });
  
  it("should update with correct information", function() { 
    updateServerTable();
    
    let addedServerRow = serverTbody.querySelector("tr");
    let serverNameTd = addedServerRow.firstElementChild;
    expect(serverNameTd.textContent).toEqual("Bob");
  });
  afterEach(function() {
    serverTbody.innerHTML = "";
    allServers = {};
    serverId = 0;
  });
});

describe("testing appendTd function", function() {
  it("should add a td element with correct value", function() {
    let tr = document.createElement("tr");
    appendTd(tr, "Test");
    expect(tr.children.length).toEqual(1);
    expect(tr.firstChild.tagName).toEqual("TD");
    expect(tr.firstChild.textContent).toEqual("Test");
  });
});

describe("testing server with empty name", function() {
  beforeEach(function() {
    serverNameInput.value = "";
  });
  it("should not create a new server if value is empty", function() {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(0);
    expect(serverId).toEqual(0);
  });
});

describe("adding many servers", function() {
  beforeEach(function() {
    allServers = {};
    serverId = 0;
    serverTbody.innerHTML = "";
  });

  it("should confirm add of multiple servers", function() {
    let serverNames = ["Richardo", "Bobby", "Sylvain", "Raphael", "John"];
    for (let name of serverNames) {
      serverNameInput.value = name;
      submitServerInfo();
    }
    expect(Object.keys(allServers).length).toEqual(5);
    updateServerTable();
    let serverRows = serverTbody.querySelectorAll("tr");
    expect(serverRows.length).toEqual(5);
  });
});

describe("Testing tip calculation function", function() {
  it("should calculate the tip percentage correctly", function() {
    let billAmt = 150;
    let tipAmt = 15;
    let tip = Math.round(tipAmt / billAmt * 100);

    expect(calculateTipPercent(billAmt, tipAmt)).toEqual(tip);
  });
});