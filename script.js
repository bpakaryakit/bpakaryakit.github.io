// Google Analytics scriptini dinamik olarak ekleyin
(function () {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5K6EX15N8K';
  document.head.appendChild(script);

  script.onload = function () {
    // Google Analytics kodunu yükledikten sonra çalıştırın
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-5K6EX15N8K');
  };
})();

// Geri git fonksiyonları
function goBack() {
  window.history.back(); // Kullanıcıyı bir önceki sayfaya götürür.
}
function goBackTwoPages(event) {
  event.preventDefault(); // Varsayılan davranışı engeller.
  window.history.go(-2);  // İki sayfa geriye gider.
}

// Menü aç/kapat işlemleri
const menuToggle = document.querySelector('.menu-span-button'); // Hamburger butonu
const menu = document.querySelector('.menu-item ul'); // Menü listesi

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open'); // Menüye "open" sınıfını ekle/kaldır
  menuToggle.innerHTML = menu.classList.contains('open')
    ? '<i class="fa-solid fa-xmark"></i>' // X simgesi
    : '<i class="fa-solid fa-bars"></i>'; // Hamburger simgesi
});

// Ders Ziyareti İzleme
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bolumIndex = urlParams.get("bolum");
  const dersIndex = urlParams.get("ders");
  const type = urlParams.get("type"); // "sinavlar" veya "notlar"

  if (bolumIndex && dersIndex && type) {
    // Olayı Google Analytics'e gönder
    gtag('event', 'ders_ziyareti', {
      event_category: 'Dersler',
      event_label: `Bölüm: ${bolumIndex}, Ders: ${dersIndex}, Tür: ${type}`,
    });
  }
});



