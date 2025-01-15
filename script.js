// Google Analytics scriptini dinamik olarak ekleyin
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5K6EX15N8K';
  document.head.appendChild(script);

  script.onload = function() {
    // Google Analytics kodunu yükledikten sonra çalıştırın
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-5K6EX15N8K');
  };
})();


  function goBack() {
    window.history.back(); // Kullanıcıyı bir önceki sayfaya götürür.
  }
  function goBackTwoPages(event) {
    event.preventDefault(); // Varsayılan davranışı engeller.
    window.history.go(-2);  // İki sayfa geriye gider.
  }

  const menuToggle = document.querySelector('.menu-span-button'); // Hamburger butonu
  const menu = document.querySelector('.menu-item ul'); // Menü listesi
  
  // Menü aç/kapat işlemi
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open'); // Menüye "open" sınıfını ekle/kaldır
  
    // Menü simgesini değiştirme (Hamburgerden X'e dönüş)
    if (menu.classList.contains('open')) {
      menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // X simgesi
    } else {
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Hamburger simgesi
    }
  });
  