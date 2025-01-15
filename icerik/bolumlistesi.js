document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const bolumListesi = document.getElementById("bolum-listesi");
      data.bolumler.forEach((bolum, index) => {
        // Ders, not ve sınav sayısını hesapla
        const dersSayisi = bolum.dersler.length;
        const notSayisi = bolum.dersler.reduce((total, ders) => total + (ders.notlar?.length || 0), 0);
        const sinavSayisi = bolum.dersler.reduce((total, ders) => total + (ders.sinavlar?.length || 0), 0);

        // Bölüm itemini oluştur
        const bolumItem = document.createElement("div");
        bolumItem.innerHTML = `
        <a href="derslistesi.html?bolum=${index}">
            <div class="bolum-item-content">
              <img class="bolum-item-image" src="${bolum.resim}" alt="${bolum.ad} Resmi">
                <div class="bolum-text-content">
                          <div class="bolum-item-title"> <p>${bolum.ad}</p></div>
                      <div class="bolum-item-text">
                            <p class="title">Ders Sayısı:<br>
                            Not Sayısı:<br>
                            Sınav Sayısı:</p>

                            <p>${dersSayisi}<br>
                            ${notSayisi}<br>
                            ${sinavSayisi}</p>
                      </div>
                </div>
            </div>
        </a>
        `;

        // Bölüm itemini listeye ekle
        bolumListesi.appendChild(bolumItem);
      });
    });
});
