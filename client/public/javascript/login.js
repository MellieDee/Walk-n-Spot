


async function loginHandler(event) {
  event.preventDefault();
  const email = document.querySelector('#emailLogin').value.trim();
  const password = document.querySelector('#passwordLogin').value.trim();
  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Incorrect email and/or password!');
    }
  }
};

async function signupHandler(event) {
  event.preventDefault();
  var test = document.querySelector('#usernameSignup').id;
  console.log(test)
  const username = document.querySelector('#usernameSignup').value.trim();
  const email = document.querySelector('#emailSignup').value.trim();
  const password = document.querySelector('#passwordSignup').value.trim();
  if (username && email && password) {
    const response = await fetch('/api/user', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    // check the response status
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}



document.querySelector('.signupForm').addEventListener('submit', signupHandler);
document.querySelector('.loginForm').addEventListener('submit', loginHandler);
