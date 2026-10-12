// Close the "On This Page" menu after picking a section.
document.querySelectorAll('.toc-menu a').forEach(function (a) {
  a.addEventListener('click', function () { a.closest('details').removeAttribute('open'); });
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
