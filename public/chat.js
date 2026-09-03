const inputBox = document.getElementById('input-box');
const runButton = document.getElementById('run-button');
const output = document.getElementById('output');
const logoutLink = document.getElementById('logout-link');

runButton.addEventListener('click', async () => {
  const message = inputBox.value.trim();
  if (!message) return;

  runButton.disabled = true;
  runButton.textContent = 'Running...';
  output.textContent = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (response.status === 401 || response.redirected) {
      window.location.href = '/login.html';
      return;
    }

    const data = await response.json();
    output.textContent = response.ok ? data.reply : `Error: ${data.error}`;
  } catch (err) {
    output.textContent = 'Error: could not reach the server.';
  } finally {
    runButton.disabled = false;
    runButton.textContent = 'Run';
  }
});

logoutLink.addEventListener('click', async (event) => {
  event.preventDefault();
  await fetch('/api/logout', { method: 'POST' });
  window.location.href = '/login.html';
});
