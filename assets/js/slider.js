/* Slider vanilla (sin dependencias). Autoplay + flechas + indicadores.
   El intervalo se lee del atributo data-interval (editable desde el GUI). */
(function () {
  var slider = document.querySelector('.slider');
  if (!slider) return;
  var track = slider.querySelector('.slider-track');
  var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
  var dotsBox = slider.querySelector('.slider-dots');
  var interval = parseInt(slider.getAttribute('data-interval'), 10) || 8000;
  var i = 0, timer = null;
  if (!slides.length) return;
  slides.forEach(function (_, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Ir al slide ' + (n + 1));
    b.addEventListener('click', function () { go(n); restart(); });
    dotsBox.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsBox.children);
  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
  }
  function next() { go(i + 1); }
  function prev() { go(i - 1); }
  function restart() { clearInterval(timer); timer = setInterval(next, interval); }
  slider.querySelector('.slider-next').addEventListener('click', function () { next(); restart(); });
  slider.querySelector('.slider-prev').addEventListener('click', function () { prev(); restart(); });
  slider.addEventListener('mouseenter', function () { clearInterval(timer); });
  slider.addEventListener('mouseleave', restart);
  go(0); restart();
})();