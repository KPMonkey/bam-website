// ---- Mobile nav toggle ----
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('is-open');
  const icon = navToggle.querySelector('i');
  icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.querySelector('i').className = 'fa-solid fa-bars';
  });
});

// ---- Active nav on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ---- Contact form ----
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const orig = btn.innerHTML;

    const action = form.getAttribute('action');
    const hasRealFormspree = action && !action.includes('YOUR_FORM_ID');

    if (hasRealFormspree) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
          form.reset();
          setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 4000);
        } else {
          throw new Error('server error');
        }
      } catch {
        btn.innerHTML = orig;
        btn.disabled = false;
        alert('Something went wrong. Please call us at (219) 712-0919.');
      }
    } else {
      // Fallback: open mail client
      const name    = form.querySelector('#name').value;
      const phone   = form.querySelector('#phone').value;
      const email   = form.querySelector('#email').value;
      const message = form.querySelector('#message').value;
      const body    = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`;
      window.location.href =
        `mailto:psperry@bamplumbing.co?subject=Website Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
    }
  });
}
