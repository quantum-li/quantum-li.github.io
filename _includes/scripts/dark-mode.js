(function() {
  var STORAGE_KEY = 'text-skin';
  var DARK = 'dark';

  function getPreferredSkin() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : '';
  }

  function setSkin(skin) {
    if (skin === DARK) {
      document.documentElement.setAttribute('data-text-skin', DARK);
    } else {
      document.documentElement.removeAttribute('data-text-skin');
    }
  }

  function toggleSkin() {
    var current = document.documentElement.getAttribute('data-text-skin');
    var next = current === DARK ? '' : DARK;
    setSkin(next);
    localStorage.setItem(STORAGE_KEY, next);
    updateToggleIcons();
  }

  function updateToggleIcons() {
    var isDark = document.documentElement.getAttribute('data-text-skin') === DARK;
    var toggles = document.querySelectorAll('.js-dark-mode-toggle');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].classList.toggle('dark-mode-toggle--active', isDark);
    }
  }

  // Apply saved preference immediately (before render)
  setSkin(getPreferredSkin());

  // Listen for OS preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setSkin(e.matches ? DARK : '');
      updateToggleIcons();
    }
  });

  // Bind toggle buttons after DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    updateToggleIcons();
    var toggles = document.querySelectorAll('.js-dark-mode-toggle');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', toggleSkin);
    }
  });
})();
