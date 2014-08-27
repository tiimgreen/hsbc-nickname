(function() {
  var accounts = {};
  var accountLength = 0;

  // Gets accounts from memory
  chrome.runtime.sendMessage({method: "getItems"}, function(response) {

    // populates accounts variable with accounts
    for (var item in response.items) {
      accounts[item] = response.items[item];
    }

    // Updates accountsLength
    for (i in accounts) {
      if (accounts.hasOwnProperty(i)) {
          accountLength++;
      }
    }

    // Get all anchors on page
    var anchors = document.getElementsByTagName('a');

    for (var i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      var text = anchor.textContent;

      // Loop through accounts and check if current anchor is for that account
      for (var prop in accounts) {
        if (text.indexOf(prop) > -1 && anchor.parentNode.tagName.toLowerCase() == 'form') {
          // If it is, update text
          var newText = accounts[prop];
          anchor.innerText = newText;
        }
      }
    };
  });
})()
