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

  var d = new Date();
  var current_time_string = d.getYear().toString() + d.getMonth().toString() + d.getDay().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
  var current_string = 'current_name_' + current_time_string;
  var new_string = 'new_name_' + current_time_string;
  var current_obj = {},
      new_obj = {};

  current_obj[current_string] = current_name;
  new_obj[new_string] = new_name;


  chrome.storage.sync.set(current_obj);
  chrome.storage.sync.set(new_obj);
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
