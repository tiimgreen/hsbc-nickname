(function() {
  // var accounts = {
  //   'STUDENT A/C': 'Spending Money',
  //   'LOY ISA BANK': 'Long Term Savings ISA',
  //   'FLEX SAVER': 'Essentials',
  //   'CREDIT CARD': 'Credit Card'
  // };

  var accounts = {};
  var accountLength = 0;

  chrome.runtime.sendMessage({method: "getItems"}, function(response) {
    for (var item in response) {
      accounts[item] = response[item];
    }

    for (i in accounts) {
      if (accounts.hasOwnProperty(i)) {
          accountLength++;
      }
    }

    console.log(accounts);

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
  });
})()
