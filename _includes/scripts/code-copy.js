(function() {
  var codeBlocks = document.querySelectorAll('.article__content pre code');
  if (!codeBlocks.length) return;

  for (var i = 0; i < codeBlocks.length; i++) {
    var pre = codeBlocks[i].parentElement;
    if (!pre) continue;

    pre.style.position = 'relative';

    var btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '<i class="fas fa-copy"></i>';

    (function(button, codeEl) {
      button.addEventListener('click', function() {
        var text = codeEl.textContent || codeEl.innerText;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function() {
            showCopied(button);
          });
        } else {
          var textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            showCopied(button);
          } catch(e) {}
          document.body.removeChild(textarea);
        }
      });
    })(btn, codeBlocks[i]);

    pre.appendChild(btn);
  }

  function showCopied(btn) {
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.classList.add('code-copy-btn--copied');
    setTimeout(function() {
      btn.innerHTML = '<i class="fas fa-copy"></i>';
      btn.classList.remove('code-copy-btn--copied');
    }, 2000);
  }
})();
