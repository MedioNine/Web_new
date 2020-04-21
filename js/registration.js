document.getElementById('username').value = '';
document.getElementById('email').value = '';

const myForm = document.getElementById('register');
myForm.onsubmit = (e) => {
  e.preventDefault();
  fetch('http://127.0.0.1:8000/auth/register/', {
    method: 'POST',
    body: new FormData(myForm),
  }).then((response) => {
    if (!response.ok) {
      window.location.reload(false);
    } else {
      localStorage.removeItem('error');
      window.location.replace('login.html');
    }
    return response.json();
  }).then((data) => {
    if (data.email) {
      localStorage.setItem('error', data.email);
    }
    if (data.username) {
      localStorage.setItem('error', data.username);
    }
    if (data.detail) {
      localStorage.setItem('error', data.detail);
    }
  });
};

window.onload = function() {
  if (localStorage.getItem('error')) {
    document.getElementById('errorShow').innerHTML =
    localStorage.getItem('error');
  }
  localStorage.removeItem('error');
};
