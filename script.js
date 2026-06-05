const variantNumber = 2;
const storageKey = 'systemBrowserInfo';
function saveSystemInfo() {
const info = {
platform: navigator.platform,
userAgent: navigator.userAgent,
language: navigator.language,
online: navigator.onLine,
cookiesEnabled: navigator.cookieEnabled,
screenWidth: screen.width,
screenHeight: screen.height,
savedAt: new Date().toLocaleString('uk-UA')
};
localStorage.setItem(storageKey, JSON.stringify(info));
}
function showStorageInfo() {
const footer = document.getElementById('footerInfo');
const data = JSON.parse(localStorage.getItem(storageKey));
if (!data) {
return;
footer.textContent = 'Інформація у localStorage відсутня.';
}
footer.innerHTML = `
<strong>Інформація про систему та браузер:</strong><br>
Платформа: ${data.platform}; Мова: ${data.language}; Онлайн: ${data.online};
Cookies: ${data.cookiesEnabled}; Екран: ${data.screenWidth}x${data.screenHeight};
Дата збереження: ${data.savedAt}
`;
}
async function loadComments() {
const commentsBlock = document.getElementById('comments');
try {
const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`);
const comments = await response.json();
commentsBlock.innerHTML = '';
comments.forEach(comment => {
const div = document.createElement('div');
div.className = 'comment';
div.innerHTML = `<h3>${comment.name}</h3><p>${comment.body}</p><small>${comment.email}</small>`;
commentsBlock.appendChild(div);
});
} catch (error) {
commentsBlock.textContent = 'Не вдалося завантажити коментарі.';
}
}
function openFeedbackModalAfterOneMinute() {
setTimeout(() => {
document.getElementById('feedbackModal').style.display = 'block';
}, 60000);
}
function setupModal() {
const modal = document.getElementById('feedbackModal');
document.getElementById('closeModal').onclick = () => modal.style.display = 'none';
window.onclick = event => {
if (event.target === modal) modal.style.display = 'none';
};
}
function applyThemeByTime() {
const hour = new Date().getHours();
if (hour >= 7 && hour < 21) {
document.body.classList.remove('dark-theme');
} else {
document.body.classList.add('dark-theme');
}
}
function setupThemeToggle() {
document.getElementById('themeToggle').addEventListener('click', () => {
document.body.classList.toggle('dark-theme');
});
}
saveSystemInfo();
showStorageInfo();
loadComments();
openFeedbackModalAfterOneMinute();
setupModal();
applyThemeByTime();
setupThemeToggle()
