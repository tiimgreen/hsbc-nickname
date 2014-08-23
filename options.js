function save_options() {
  var current_name = $('#current_name').val();
  var new_name = $('#new_name').val();
  var error = false;

  if (current_name == "") {
    alert('You need to set the current name');
    error = true;
  }

  if (new_name == "") {
    alert('You need to set the new name');
    error = true;
  }

  if (error)
    return;

  var my_obj = {};
  my_obj[current_name] = new_name;

  chrome.storage.sync.set(my_obj);
  alert('Saved');
  populateTable();
}

function populateTable() {
  chrome.storage.sync.get(null, function(items) {
    $('table#all_accounts tbody').empty();
    for (var item in items) {
      $('table#all_accounts tbody').append('<tr><td>' + item + '</td><td>' + items[item] + '</td></tr>');
    }
  });
}

$('#delete_all_accounts').on('click', function(e) {
  e.preventDefault();

  chrome.storage.sync.get(null, function(items) {
    for (var item in items) {
      chrome.storage.sync.remove(item);
    }
    alert('Deleted');
  });
})

populateTable();
document.getElementById('save').addEventListener('click', save_options);
