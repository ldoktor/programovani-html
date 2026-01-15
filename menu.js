/*
 * Jednoduché horní menu funkční jak lokálně, tak pomocí
 * python -m http.server
 * Použití: <script src="menu.js"></script> někam do <body>
 */

(function() {
  // --- MENU HTML ---
  const html = `
  <nav id="horni-menu">
    <ul class="top">
      <li><a href="verzovani.html" target="_top">Verzování</a></li>
      <li class="has-sub">
        <a href="#" aria-haspopup="true" aria-expanded="false">Pokyny ▾</a>
        <ul class="sub">
          <li><a href="sablona.html" target="_top">Šablona</a></li>
          <li><a href="css.html" target="_top">Styl</a></li>
        </ul>
      </li>
      <li class="has-sub">
        <a href="#" aria-haspopup="true" aria-expanded="false">Lukáš ▾</a>
        <ul class="sub">
          <li><a href="stunts.html" target="_top">Stunts</a></li>
          <li><a href="minetest.html" target="_top">Minetest</a></li>
          <li><a href="openttd.html" target="_top">OpenTTD</a></li>
        </ul>
      </li>
      <li class="has-sub">
        <a href="#" aria-haspopup="true" aria-expanded="false">Piki ▾</a>
        <ul class="sub">
          <li><a href="homm.html" target="_top">HoMM3</a></li>
        </ul>
      </li>
    </ul>
  </nav>`;

  // --- VLOŽENÍ MENU ---
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.prepend(wrapper);
  document.body.classList.add('has-fixed-menu');

  // --- Otevření / zavření podmenu na kliknutí ---
  wrapper.querySelectorAll('.has-sub > a').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const expanded = a.getAttribute('aria-expanded') === 'true';
      a.setAttribute('aria-expanded', String(!expanded));
      a.parentElement.querySelector('.sub').style.display = expanded ? 'none' : 'block';
    });
  });

  // --- Zavření submenu při kliknutí na položku ---
  wrapper.querySelectorAll('.sub a').forEach(link=>{
    link.addEventListener('click', ()=>{
      wrapper.querySelectorAll('.sub').forEach(s=>s.style.display='none');
      wrapper.querySelectorAll('.has-sub > a')
        .forEach(a=>a.setAttribute('aria-expanded','false'));
    });
  });

  // --- Zavření submenu při kliknutí mimo menu ---
  document.addEventListener('click', e=>{
    if (!e.target.closest('#horni-menu')) {
      wrapper.querySelectorAll('.sub').forEach(s=>s.style.display='none');
      wrapper.querySelectorAll('.has-sub > a')
        .forEach(a=>a.setAttribute('aria-expanded','false'));
    }
  });
})();
