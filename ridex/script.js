// FAQ accordion
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  // Open clicked if it was closed
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// Smooth active nav highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--yellow)' : '';
  });
});

// Web3Forms Mail Integration
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            // using a public access key for web3forms testing or let the user replace it
            formData.append('access_key', 'YOUR_ACCESS_KEY_HERE'); 

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    alert('Booking request submitted! We will contact you shortly. 🚗');
                    this.reset();
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Something went wrong. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
