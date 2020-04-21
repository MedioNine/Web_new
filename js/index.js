const token = localStorage.getItem('Token');
if (token) {
  fetch('http://127.0.0.1:8000/users/me/', {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
    },
  }).then((response) =>response.json()).then((data) => {
    localStorage.setItem('user', data.user.username);
    document.getElementById('user').innerHTML = localStorage.getItem('user');
  });
}

logOut= (e)=> {
  e.preventDefault();
  fetch('http://127.0.0.1:8000/auth/logout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  }).then((res) => {
    localStorage.removeItem('Token');
    localStorage.removeItem('user');
    window.location.reload(false);
    return res.json();
  });
};

if (!token) {
  document.getElementById('logout').hidden = true;
} else document.getElementById('login').hidden = true;
