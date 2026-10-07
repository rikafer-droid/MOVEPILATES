const pilatesServices = [
  ['⌁', 'Pilates com aparelhos', 'Prática orientada com equipamentos de Pilates.'],
  ['◎', 'Pilates de solo', 'Exercícios de Pilates realizados no solo.'],
  ['↗', 'Pilates para iniciantes', 'Um começo respeitando seu nível e seu ritmo.'],
  ['⌇', 'Pilates avançado', 'Prática para quem já tem experiência com Pilates.'],
  ['✳', 'Pilates para gestantes', 'Acompanhamento atento às necessidades dessa fase.'],
  ['◉', 'Pilates para idosos', 'Movimento e exercícios respeitando cada pessoa.'],
];
const physioServices = [
  ['⌁', 'Fisioterapia ortopédica', 'Atenção individual para suas necessidades.'],
  ['✳', 'Fisioterapia para gestantes', 'Cuidado acompanhado durante essa fase.'],
  ['◉', 'Fisioterapia para idosos', 'Atendimento atento ao seu momento e ritmo.'],
  ['↗', 'Reabilitação pós-cirúrgica', 'Acompanhamento durante o processo de reabilitação.'],
  ['⌇', 'Tratamento para escoliose', 'Cuidado direcionado às suas necessidades.'],
  ['◎', 'Tratamento de artrite', 'Atendimento individualizado para seu momento.'],
];

function renderCards(targetId, items, message) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = items.map(([icon, title, copy], index) => `
    <article class="service-card reveal">
      <div class="card-top"><span>0${index + 1} / MOVE</span><span class="service-icon" aria-hidden="true">${icon}</span></div>
      <h3>${title}</h3><p>${copy}</p>
      <a class="card-arrow" data-whatsapp="${message}" href="https://wa.me/5511996929088" target="_blank" rel="noopener" aria-label="Saiba mais sobre ${title}">↗</a>
    </article>`).join('');
}

renderCards('pilates-cards', pilatesServices, 'Olá! Gostaria de saber mais sobre as aulas de Pilates.');
renderCards('fisio-cards', physioServices, 'Olá! Gostaria de saber mais sobre os atendimentos de Fisioterapia.');

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  const message = link.dataset.whatsapp;
  link.href = `https://wa.me/5511996929088?text=${encodeURIComponent(message)}`;
});

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  mobileMenu.hidden = isOpen;
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menu');
}));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}
