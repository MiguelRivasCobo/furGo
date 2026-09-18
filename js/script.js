document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initGalleries();
  initReservarButtons();
  initBookingForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* Menú móvil */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

/* Galería de fotos por furgoneta (6 fotos: nombre-1.jpeg ... nombre-6.jpeg) */
function initGalleries() {
  const galleries = document.querySelectorAll('.van-gallery');
  const photosPerVan = 6;

  galleries.forEach(gallery => {
    const van = gallery.dataset.gallery;
    const img = gallery.querySelector('.van-gallery-main');
    const prevBtn = gallery.querySelector('.gallery-arrow.prev');
    const nextBtn = gallery.querySelector('.gallery-arrow.next');
    const dotsWrapper = gallery.querySelector('.gallery-dots');
    let current = 0;

    for (let i = 0; i < photosPerVan; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showPhoto(i));
      dotsWrapper.appendChild(dot);
    }

    function showPhoto(index) {
      current = (index + photosPerVan) % photosPerVan;
      img.src = `images/${van}/${van}-${current + 1}.jpeg`;
      dotsWrapper.querySelectorAll('span').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    prevBtn.addEventListener('click', () => showPhoto(current - 1));
    nextBtn.addEventListener('click', () => showPhoto(current + 1));
  });
}

/* Al pulsar "Reservar" en una furgoneta, preselecciona el modelo en el formulario */
function initReservarButtons() {
  document.querySelectorAll('.btn-reservar').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('furgoneta').value = btn.dataset.van;
    });
  });
}

/* Envío del formulario de reserva por WhatsApp */
function initBookingForm() {
  const WHATSAPP_NUMBER = '34674695959';
  const form = document.getElementById('bookingForm');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const furgoneta = document.getElementById('furgoneta').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    let texto = `Hola FurGO, quiero reservar una furgoneta.%0A`;
    texto += `Nombre: ${nombre}%0A`;
    texto += `Teléfono: ${telefono}%0A`;
    texto += `Furgoneta: ${furgoneta}%0A`;
    texto += `Recogida: ${fechaInicio}%0A`;
    texto += `Devolución: ${fechaFin}`;
    if (mensaje) {
      texto += `%0AMensaje: ${mensaje}`;
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, '_blank');
  });
}
