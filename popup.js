function populateTable() {
  chrome.storage.sync.get(null, function(items) {
    $('.table tbody').empty();
    for (var item in items) {
      $('.table tbody').append('<tr><td>' + item + '</td><td>' + items[item] + '</td></tr>');
    }
  });
}

$('#change_accounts').on('click', function (e) {
  e.preventDefault();

  chrome.tabs.create({'url': chrome.extension.getURL("options.html") } )
})

populateTable();
