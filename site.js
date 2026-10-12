// Close the "On This Page" menu after picking a section.
document.querySelectorAll('.toc-menu a').forEach(function (a) {
  a.addEventListener('click', function () { a.closest('details').removeAttribute('open'); });
});

// "Copy" button on long code blocks.
document.querySelectorAll('button.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var text = document.getElementById(btn.dataset.target).textContent;
    var reset = function (label) {
      btn.textContent = label;
      setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
    };
    // Select the text in a throwaway textarea and copy it. This is synchronous,
    // so it works inside the click without waiting on a permission prompt.
    var legacyCopy = function () {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove();
      return ok;
    };
    if (legacyCopy()) {
      reset('Copied');
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { reset('Copied'); },
        function () { reset('Select and copy manually'); }
      );
    } else {
      reset('Select and copy manually');
    }
  });
});

// Click-to-reveal email. The address is never written in the HTML: it is stored
// reversed in data attributes and only assembled when someone clicks, so
// scrapers that read the page source (or run scripts without clicking) never see it.
document.querySelectorAll('button.reveal').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var rev = function (s) { return s.split('').reverse().join(''); };
    var addr = rev(btn.dataset.u) + '@' + rev(btn.dataset.d);
    var link = document.createElement('a');
    link.href = 'mailto:' + addr;
    link.textContent = addr;
    btn.replaceWith(link);
    link.focus();
  });
});
