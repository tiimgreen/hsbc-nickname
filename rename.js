(function() {
  // var accounts = {
  //   'STUDENT A/C': 'Spending Money',
  //   'LOY ISA BANK': 'Long Term Savings ISA',
  //   'FLEX SAVER': 'Essentials',
  //   'CREDIT CARD': 'Credit Card'
  // };
  var accounts = {}
  chrome.storage.sync.get(null, function(items) {
    for (var item in items) {
      accounts[item] = items[item];
    }
  });

  alert(accounts);

  var accountLength = 0;

  for (i in accounts) {
    if (accounts.hasOwnProperty(i)) {
        accountLength++;
    }
  }

  var anchors = document.getElementsByTagName('a');

  for (var i = 0; i < anchors.length; i++) {
    var anchor = anchors[i];
    var text = anchor.textContent;

    for (var prop in accounts) {
      if (text.indexOf(prop) > -1 && anchor.parentNode.tagName.toLowerCase() == 'form') {
        var newText = accounts[prop];
        anchor.innerText = newText;
      }
    }
  };
})()
