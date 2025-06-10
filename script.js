// MENU UŻYTKOWNIKA
const userIcon = document.getElementById('userIcon');
const userMenu = document.getElementById('userMenu');

userIcon?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isShown = userMenu.classList.toggle('show');
  userIcon.setAttribute('aria-expanded', isShown.toString());
});

document.addEventListener('click', (e) => {
  if (!userIcon.contains(e.target) && !userMenu.contains(e.target)) {
    userMenu.classList.remove('show');
    userIcon.setAttribute('aria-expanded', 'false');
  }
});


// FUNKCJE MODALNE
function openModal(modal, triggerBtn) {
  modal.style.display = 'flex';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // const firstInput = modal.querySelector('input, textarea, select, button');
  // if (firstInput) firstInput.focus();

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-overlay-bg')) {
      closeModal(modal, triggerBtn);
    }
  });

  function escListener(e) {
    if (e.key === 'Escape') {
      closeModal(modal, triggerBtn);
      document.removeEventListener('keydown', escListener);
    }
  }

  document.addEventListener('keydown', escListener);
}

function closeModal(modal, triggerBtn) {
  modal.style.display = 'none';
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (triggerBtn) triggerBtn.focus();
}

// OTWIERANIE MODALI
document.getElementById('openContactBtn')?.addEventListener('click', () => {
  openModal(
    document.getElementById('contactModal'),
    document.getElementById('openContactBtn')
  );
});

document.getElementById('openAnotherFormBtn')?.addEventListener('click', () => {
  openModal(
    document.getElementById('organizator-modal'),
    document.getElementById('openAnotherFormBtn')
  );
});


// WALIDACJA FORMULARZY
document.querySelectorAll('form.modal-form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    alert('Dziękujemy za kontakt!');
    form.reset();

    const modal = form.closest('.modal');
    const triggerId = modal.dataset.triggerId;
    closeModal(modal, document.getElementById(triggerId));
  });
});


// WYŚWIETLANIE NAZWY PLIKU
document.querySelectorAll('input[type="file"]').forEach((input) => {
  const output = input.closest('label')?.querySelector('.file-name') || document.getElementById('fileName');
  input.addEventListener('change', () => {
    output.textContent = input.files.length > 0
      ? input.files[0].name
      : 'Nie wybrano pliku';
  });
});


// SLIDER FADE
function initializeSlider(sliderContainer) {
  const slides = sliderContainer.querySelectorAll('.slide');
  let currentIndex = 0;

  slides.forEach((slide, i) => {
    slide.style.position = 'absolute';
    slide.style.top = 0;
    slide.style.left = 0;
    slide.style.width = '100%';
    slide.style.transition = 'opacity 1s ease-in-out';
    slide.style.opacity = i === 0 ? '1' : '0';
    slide.style.zIndex = i === 0 ? '10' : '1';
  });

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.zIndex = i === index ? '10' : '1';
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  setInterval(nextSlide, 4000);
}

document.querySelectorAll('.slider-container').forEach(initializeSlider);


// KLASA TŁA PO ZAŁADOWANIU
document.addEventListener('DOMContentLoaded', () => {
  const bgWrapper = document.querySelector('.background-wrapper');
  if (bgWrapper) {
    setTimeout(() => {
      bgWrapper.classList.add('visible');
    }, 100);
  }
});
const countries = [
    "Afganistan", "Albania", "Algieria", "Andora", "Angola", "Argentyna", "Armenia", "Australia",
    "Austria", "Azerbejdżan", "Bahamy", "Bahrajn", "Bangladesz", "Barbados", "Belgia",
    "Belize", "Benin", "Bhutan", "Białoruś", "Boliwia", "Bośnia i Hercegowina", "Botswana", "Brazylia",
    "Brunei", "Bułgaria", "Burkina Faso", "Burundi", "Chile", "Chiny", "Chorwacja", "Cypr", "Czad",
    "Czechy", "Dania", "Demokratyczna Republika Konga", "Dominika", "Dominikana", "Dżibuti", "Egipt",
    "Ekwador", "Erytrea", "Estonia", "Eswatini", "Etiopia", "Fidżi", "Filipiny", "Finlandia", "Francja",
    "Gabon", "Gambia", "Ghana", "Grecja", "Grenada", "Gruzja", "Gujana", "Gwatemala", "Gwatemala",
    "Haiti", "Hiszpania", "Holandia", "Honduras", "Hongkong", "Indie", "Indonezja", "Irak", "Iran",
    "Irlandia", "Islandia", "Izrael", "Jamajka", "Japonia", "Jemen", "Jordania", "Kambodża", "Kamerun",
    "Kanada", "Katar", "Kazachstan", "Kenia", "Kirgistan", "Kiribati", "Kolumbia", "Komory",
    "Kongo", "Korea Południowa", "Korea Północna", "Kostaryka", "Kuba", "Kuwejt", "Laos", "Lesotho",
    "Liban", "Liberia", "Libia", "Liechtenstein", "Litwa", "Luksemburg", "Łotwa", "Macedonia Północna",
    "Madagaskar", "Malawi", "Malediwy", "Malezja", "Mali", "Malta", "Maroko", "Mauretania", "Mauritius",
    "Meksyk", "Mjanma", "Mołdawia", "Monako", "Mongolia", "Mozambik", "Namibia", "Nepal", "Niemcy",
    "Niger", "Nigeria", "Nikaragua", "Norwegia", "Nowa Zelandia", "Oman", "Pakistan", "Palau", "Panama",
    "Papua-Nowa Gwinea", "Paragwaj", "Peru", "Polska", "Portugalia", "Republika Południowej Afryki",
    "Republika Środkowoafrykańska", "Republika Zielonego Przylądka", "Rosja", "Rumunia", "Rwanda",
    "Saint Kitts i Nevis", "Saint Lucia", "Saint Vincent i Grenadyny", "Salwador", "Samoa", "San Marino",
    "Senegal", "Serbia", "Seszele", "Sierra Leone", "Singapur", "Słowacja", "Słowenia", "Somalia",
    "Sri Lanka", "Stany Zjednoczone", "Sudan", "Sudan Południowy", "Surinam", "Syria", "Szwajcaria",
    "Szwecja", "Tadżykistan", "Tajlandia", "Tanzania", "Timor Wschodni", "Togo", "Tonga", "Trynidad i Tobago",
    "Tunezja", "Turcja", "Turkmenistan", "Tuvalu", "Uganda", "Ukraina", "Urugwaj", "Uzbekistan",
    "Vanuatu", "Watykan", "Wenezuela", "Węgry", "Wielka Brytania", "Wietnam", "Włochy", "Wybrzeże Kości Słoniowej",
    "Wyspy Marshalla", "Wyspy Salomona", "Wyspy Świętego Tomasza i Książęca", "Zambia", "Zimbabwe", "Zjednoczone Emiraty Arabskie"
  ];


const selects = document.querySelectorAll(".kraj-select");
selects.forEach(select => {
  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country.toLowerCase();  // lub jak wolisz
    option.textContent = country;
    select.appendChild(option);
  });
});

window.addEventListener("load", function () {
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 800); // szybciej – 0.8s
  });


