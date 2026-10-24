/* ==========================================================
   ATELIÊ ARROTEIA - main.js
   Para usar fotos reais, preencha o campo "img" de cada item
   com o caminho da imagem. Exemplo: img: "images/vestido1.jpg"
   ========================================================== */

/* ---------- Configurações ---------- */
// Número do WhatsApp com 55 + DDD + número (somente dígitos)
const WHATSAPP = "5519981510652";

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  header.classList.toggle("header--solid", window.scrollY > 40);
});


/* ---------- Carrossel de clientes ---------- */
const track = document.querySelector(".carousel__track");
const btnPrev = document.querySelector(".carousel__btn--prev");
const btnNext = document.querySelector(".carousel__btn--next");

if (track && btnPrev && btnNext) {
  // Largura de uma foto + o espaço entre elas
  const passo = () => {
    const foto = track.querySelector(".carousel__slide");
    const espaco = parseFloat(getComputedStyle(track).columnGap) || 0;
    return foto.getBoundingClientRect().width + espaco;
  };

  const noFim = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;

  btnNext.addEventListener("click", () => {
    // no fim da fila, volta para a primeira foto
    if (noFim()) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollBy({ left: passo(), behavior: "smooth" });
  });

  btnPrev.addEventListener("click", () => {
    // no começo, vai para a última foto
    if (track.scrollLeft <= 4) track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    else track.scrollBy({ left: -passo(), behavior: "smooth" });
  });
}


/* ---------- Carrossel: movimento automático ---------- */
const INTERVALO = 4000; // tempo entre uma troca e outra, em milissegundos (4000 = 4 s)
const carrossel = document.querySelector(".carousel");
const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (carrossel && btnNext && !reduzMovimento) {
  let timer = null;

  const iniciar = () => {
    if (!timer) timer = setInterval(() => btnNext.click(), INTERVALO);
  };

  const parar = () => {
    clearInterval(timer);
    timer = null;
  };

  // Pausa quando a pessoa interage com o carrossel
  carrossel.addEventListener("mouseenter", parar);
  carrossel.addEventListener("mouseleave", iniciar);
  carrossel.addEventListener("focusin", parar);
  carrossel.addEventListener("focusout", iniciar);
  carrossel.addEventListener("touchstart", parar, { passive: true });
  carrossel.addEventListener("touchend", () => setTimeout(iniciar, INTERVALO), { passive: true });

  // Pausa quando a aba do navegador não está visível
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) parar();
    else iniciar();
  });

  iniciar();
}
