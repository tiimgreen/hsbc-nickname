alert('loaded');

function save_options() {
  alert('saved');
}

document.getElementById('save').addEventListener('click', save_options);
