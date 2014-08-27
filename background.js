// Listens for requests from extension in background and serves data when required
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getItems") {
    chrome.storage.sync.get(null, function(items) {
      sendResponse({'items': items});
    });

    // Required becuase it's an asynchronous call
    return true;
  }
});
