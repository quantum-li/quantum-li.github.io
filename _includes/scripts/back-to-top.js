(function() {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;

  var THRESHOLD = 300;
  var visible = false;

  function toggleButton() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > THRESHOLD && !visible) {
      btn.classList.add('back-to-top--visible');
      visible = true;
    } else if (scrollTop <= THRESHOLD && visible) {
      btn.classList.remove('back-to-top--visible');
      visible = false;
    }
  }

  window.addEventListener('scroll', toggleButton, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleButton();
})();
