chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getItems") {
    chrome.storage.sync.get(null, function(items) {
      sendResponse({'items': items});
    });
    return true;
  }
});
