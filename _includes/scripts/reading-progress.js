(function() {
  var bar = document.querySelector('.reading-progress-bar');
  if (!bar) return;

  var article = document.querySelector('.article__content');
  if (!article) return;

  function updateProgress() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) {
      bar.style.transform = 'scaleX(0)';
      return;
    }
    var progress = Math.min(scrollTop / docHeight, 1);
    bar.style.transform = 'scaleX(' + progress + ')';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();
