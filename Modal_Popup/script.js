// Get elements
const openModalBtn = document.getElementById('openModal');
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementById('closeModal');

// Open Modal
openModalBtn.addEventListener('click', () => {
  modal.classList.add('show');
});

// Close Modal with Close Button
closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

// Close Modal when clicking on overlay (background)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

// Close with Escape key (bonus feature)
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && modal.classList.contains('show')) {
    modal.classList.remove('show');
  }
});

// Optional: Prevent form submit (for demo)
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('✅ Message sent successfully! (Demo)');
  modal.classList.remove('show');
});