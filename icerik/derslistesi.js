document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bolumIndex = urlParams.get("bolum");

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const bolum = data.bolumler[bolumIndex];

      if (!bolum || !bolum.dersler || bolum.dersler.length === 0) {
        // Eğer ders yoksa kullanıcıyı ana sayfaya yönlendir
        const messageDiv = document.createElement("div");
        messageDiv.textContent = "Bu bölümde hiç ders bulunmamaktadır. Bölümler sayfasına yönlendiriliyorsunuz...";
        messageDiv.style.position = "fixed";
        messageDiv.style.top = "30%";
        messageDiv.style.left = "50%";
        messageDiv.style.transform = "translate(-50%, -50%)";
        messageDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        messageDiv.style.color = "white";
        messageDiv.style.padding = "20px";
        messageDiv.style.borderRadius = "10px";
        messageDiv.style.zIndex = "1000";
        document.body.appendChild(messageDiv);

        setTimeout(() => {
          window.location.href = "bolumlistesi.html"; // Ana sayfa URL'sini burada belirtin
        }, 5000);

        return;
      }

      document.getElementById("bolum-adi").textContent = bolum.ad;

      const dersListesi = document.getElementById("ders-listesi");
      bolum.dersler.forEach((ders, index) => {
        // Sınav ve not sayısını hesapla
        const sinavSayisi = ders.sinavlar?.length || 0;
        const notSayisi = ders.notlar?.length || 0;

        // Sınav ve not bağlantılarını oluştur
        const sinavlarLink = sinavSayisi > 0 
          ? `<a href="iceriklistesi.html?bolum=${bolumIndex}&ders=${index}&type=sinavlar">Sınavlar</a>`
          : '';
        const notlarLink = notSayisi > 0 
          ? `<a href="iceriklistesi.html?bolum=${bolumIndex}&ders=${index}&type=notlar">Notlar</a>`
          : '';

        // Ders elemanını oluştur
        const dersItem = document.createElement("div");
        dersItem.innerHTML = `
          <div class="ders-item">
            <div class="ders-item-list">
              <div>
                <p class="ders-item-title">${ders.ad}</p>
              </div>

              <div class="ders-item-text">
                <p class="title">Sınav Sayısı:<br>
                Not Sayısı:</p>
                <p>${sinavSayisi}<br>
                ${notSayisi}</p>
              </div>
              <div class="ders-item-links">
                ${sinavlarLink}
                ${notlarLink}
              </div>
            </div>
          </div>
        `;

        // Ders elemanını listeye ekle
        dersListesi.appendChild(dersItem);
      });
    });
});
