// Saves data in input boxes
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

  chrome.storage.sync.get(current_name, function(items) {
    if (items && items[current_name] == new_name) {
      alert('That account already exists, not saved');
      return;
    } else {
      chrome.storage.sync.set(my_obj);
      alert('Saved');
      populateTable();
    }
  });
}

// Populates table with all saves accounts and aliases
function populateTable() {
  chrome.storage.sync.get(null, function(items) {
    $('table#all_accounts tbody').empty();
    for (var item in items) {
      $('table#all_accounts tbody').append('<tr><td>' + item + '</td><td>' + items[item] + '</td><td><a href="#" class="delete-item">Delete</a></td></tr>');
    }
  });
}

// Populates table on load
populateTable();

// Deletes all accounts from memory
$('#delete_all_accounts').on('click', function(e) {
  e.preventDefault();

  chrome.storage.sync.clear(function(items) {
    alert('Deleted');
  });
});

// Saves information in input boxes
$('#save').on('click', function(e) {
  save_options();
});

// Deletes given item
$(document).on('click', '.delete-item', function(e) {
  e.preventDefault();

  var name = $(this).parent().siblings().first().text();
  chrome.storage.sync.remove(name);
  alert('deleted');
});
