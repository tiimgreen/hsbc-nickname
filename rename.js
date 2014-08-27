(function() {
  var accounts = {};
  var accountLength = 0;

  chrome.runtime.sendMessage({method: "getItems"}, function(response) {
    for (var item in response.items) {
      accounts[item] = response.items[item];
    }

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
  });
})()
