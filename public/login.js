const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    window.location.href = '/';
    return;
  }

  const data = await response.json().catch(() => ({}));
  errorMessage.textContent = data.error || 'Login failed.';
  errorMessage.hidden = false;
});
