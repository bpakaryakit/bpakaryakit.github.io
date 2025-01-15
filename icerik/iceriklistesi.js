document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bolumIndex = urlParams.get("bolum");
  const dersIndex = urlParams.get("ders");
  const type = urlParams.get("type"); // "sinavlar" veya "notlar"

  if (!bolumIndex || !dersIndex || !type) {
    alert("Geçersiz parametreler!");
    return;
  }

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const ders = data.bolumler[bolumIndex]?.dersler[dersIndex];

      if (!ders || !ders[type]) {
        alert("İçerik bulunamadı! Ana Sayfaya yönlendiriliyorsunuz...");

        // 3 saniye sonra anasayfaya yönlendir
        setTimeout(function () {
          window.location.href = "/index.html"; // Anasayfa adresi
        }, 1000); // 1000 milisaniye (1 saniye) bekler
        return;
      }

      const icerikListesi = document.getElementById("icerik-listesi");

      document.getElementById("icerik-ders-adi").textContent = ders.ad;

      // Başlığı ayarla
      document.getElementById("icerik-adi").textContent =
        type === "sinavlar" ? "Sınavlar" : "Notlar";

      // İçeriği listele
      ders[type].forEach((item, index) => { // index burada kullanılacak
        const icerikItem = document.createElement("div");

        // Başlangıçta içerik öğesini oluştur
        let content = `
          <a href="${item.url}" target="_blank">
            <div class="icerik-1">${index + 1}. ${item.ad}
              <div class="icerik-2">
                
                <p>Dosya Boyutu:</p><p>${item.url.endsWith(".pdf") ? "<span id='file-size'>Yükleniyor...</span>" : ""}</p>
               </div>
            </div>
          </a>
        `;

        icerikItem.innerHTML = content;
        icerikListesi.appendChild(icerikItem);

        // PDF dosyası ise boyutunu kontrol et ve ekle
        if (item.url.endsWith(".pdf")) {
          getFileSize(item.url, (formattedSize) => {
            // Dosya boyutunu güncelle
            icerikItem.querySelector('#file-size').textContent = formattedSize;
          });
        }
      });
    })
    .catch((error) => console.error("JSON Yükleme Hatası:", error));

  // PDF dosyasının boyutunu almak ve içerik elemanına eklemek için fonksiyon
  function getFileSize(url, callback) {
    fetch(url, { method: 'HEAD' }) // Sadece başlık bilgilerini alır
      .then(response => {
        const contentLength = response.headers.get('Content-Length');

        if (!contentLength) {
          console.error("Dosya boyutu bulunamadı.");
          return;
        }

        const sizeInBytes = parseInt(contentLength);
        const formattedSize = formatFileSize(sizeInBytes);

        // Boyut bilgisini geri gönder
        callback(formattedSize);
      })
      .catch(error => {
        console.error("Hata:", error);
      });
  }

  // Boyutu KB, MB, GB cinsinden formatlayan fonksiyon
  function formatFileSize(sizeInBytes) {
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(2)} KB`; // KB cinsinden
    }

    const sizeInMB = sizeInKB / 1024;
    if (sizeInMB < 1024) {
      return `${sizeInMB.toFixed(2)} MB`; // MB cinsinden
    }

    const sizeInGB = sizeInMB / 1024;
    return `${sizeInGB.toFixed(2)} GB`; // GB cinsinden
  }
});
