/* Hamburger menu */
function toggleMenu(){
  var btn = document.getElementById('hamburger');
  var nav = document.getElementById('mobileNav');
  if(!btn || !nav) return;
  var open = nav.classList.toggle('open');
  btn.classList.toggle('open', open);
}
document.addEventListener('DOMContentLoaded', function(){
  // Close on link click
  document.querySelectorAll('.mobile-nav a').forEach(function(a){
    a.addEventListener('click', function(){
      var nav = document.getElementById('mobileNav');
      var btn = document.getElementById('hamburger');
      if(nav) nav.classList.remove('open');
      if(btn) btn.classList.remove('open');
    });
  });
  // Close when clicking outside
  document.addEventListener('click', function(e){
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburger');
    if(!nav || !nav.classList.contains('open')) return;
    if(!nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)){
      nav.classList.remove('open');
      btn.classList.remove('open');
    }
  });
});

/* Shared site behaviour: scroll-reveal animations */
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!els.length || !('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('in'); obs.unobserve(entry.target); }
    });
  }, {threshold:0.12});
  els.forEach(function(el){ obs.observe(el); });
})();

/* Temporary closure popup — delete this block to remove it (auto-hides after Oct 14, 2026) */
document.addEventListener('DOMContentLoaded', function(){
  if (new Date() >= new Date('2026-10-15T00:00:00+03:00')) return;
  try { if (sessionStorage.getItem('closedPopupSeen')) return; } catch(e) {}
  var o = document.createElement('div');
  o.className = 'closed-popup-overlay';
  o.innerHTML =
    '<div class="closed-popup" role="dialog" aria-modal="true" aria-labelledby="cpTitle">' +
      '<button type="button" class="closed-popup-x" aria-label="סגור / Close">&times;</button>' +
      '<h2 id="cpTitle">העסק סגור זמנית</h2>' +
      '<p class="cp-he">אני בחופשה עד ה-14 לאוקטובר</p>' +
      '<hr>' +
      '<div dir="ltr" lang="en"><h3>Temporarily closed</h3>' +
      '<p>I am on vacation until October 14th.</p></div>' +
      '<button type="button" class="closed-popup-ok">הבנתי / OK</button>' +
    '</div>';
  function close(){
    o.remove();
    try { sessionStorage.setItem('closedPopupSeen', '1'); } catch(e) {}
  }
  o.addEventListener('click', function(e){
    if (e.target === o || e.target.classList.contains('closed-popup-x') || e.target.classList.contains('closed-popup-ok')) close();
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  document.body.appendChild(o);
  o.querySelector('.closed-popup-ok').focus();
});
