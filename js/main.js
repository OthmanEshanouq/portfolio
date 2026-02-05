/**
 * Portfolio - Main JavaScript
 * Handles: smooth scroll, mobile nav, GitHub projects fetch
 */

(function () {
  'use strict';

  // ---------- Year in footer ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav toggle ----------
  var navToggle = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navMobile.classList.toggle('hidden');
    });
  }

  // ---------- Close mobile menu when a link is clicked ----------
  var mobileLinks = navMobile ? navMobile.querySelectorAll('a') : [];
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMobile.classList.add('hidden');
    });
  });

  // ---------- Smooth scroll for anchor links (fallback for older browsers) ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Fetch GitHub repos and render projects ----------
  var GITHUB_USER = 'OthmanEshanouq';
  var API_URL = 'https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=30&sort=updated';

  // Pinned order and live URLs. JavaScript-Lecture is excluded.
  var PROJECT_ORDER = ['restaurant-system', 'halawah_restaurant', 'Premium_N-Tech_Fabric', 'Event_Funnel'];
  var LIVE_URL_MAP = {
    'restaurant-system': 'https://othmaneshanouq.github.io/restaurant-system/',
    'halawah_restaurant': 'https://othmaneshanouq.github.io/halawah_restaurant/',
    'Premium_N-Tech_Fabric': 'https://othmaneshanouq.github.io/Premium_N-Tech_Fabric/#top',
    'Event_Funnel': 'https://othmaneshanouq.github.io/Event_Funnel/index.html'
  };
  var REPOS_TO_HIDE = ['portfolio', 'JavaScript-Lecture', 'challenge', 'CSS-Tricks', '-HTML-CSS-Part-1', 'HTML-CSS-Part-1', 'Web-Page-Structure-Layout', 'valleys_adventure_event_funnel', 'debugging-and-customization', 'debugging_and_customization', 'magic-toggle', 'magic_toggle'];

  // Override thumbnail/logo URL per repo (local assets)
  var THUMBNAIL_OVERRIDE = {
    'restaurant-system': 'assets/logo%20burger%20station.png',
    'halawah_restaurant': "assets/halawah's%20logo.png",
    'Event_Funnel': 'assets/logo(cycling%20everywhere).png',
    'Premium_N-Tech_Fabric': 'assets/logo%20N-Tech.png'
  };

  // Override display name per repo (e.g. Event_Funnel -> "cycling everywhere")
  var DISPLAY_NAME_MAP = {
    'Event_Funnel': 'cycling everywhere'
  };

  var grid = document.getElementById('projects-grid');
  var loading = document.getElementById('projects-loading');
  if (!grid) return;

  function langToLabel(lang) {
    if (!lang) return 'Code';
    var map = { JavaScript: 'JS', TypeScript: 'TS', 'Vue': 'Vue', 'C#': 'C#' };
    return map[lang] || lang;
  }

  function getThumbnailSrc(repoName, liveUrl) {
    // Use override logo URL if set (e.g. restaurant-system Burger Station logo)
    if (THUMBNAIL_OVERRIDE[repoName]) return THUMBNAIL_OVERRIDE[repoName];
    // Otherwise use site favicon from live URL when available
    if (liveUrl) {
      var base = liveUrl.split('#')[0].replace(/\/[^/]*$/, '');
      base = base + (base.slice(-1) === '/' ? '' : '/');
      return base + 'favicon.ico';
    }
    return 'assets/projects/' + repoName + '.png';
  }

  function sortRepos(repos) {
    var byName = {};
    repos.forEach(function (r) { byName[r.name] = r; });
    var ordered = [];
    PROJECT_ORDER.forEach(function (name) {
      if (byName[name]) ordered.push(byName[name]);
    });
    repos.forEach(function (r) {
      if (PROJECT_ORDER.indexOf(r.name) === -1 && REPOS_TO_HIDE.indexOf(r.name) === -1) ordered.push(r);
    });
    return ordered;
  }

  function renderProject(repo) {
    var name = repo.name || 'Project';
    var displayName = DISPLAY_NAME_MAP[name] || name.replace(/-/g, ' ').replace(/_/g, ' ');
    var desc = repo.description || 'No description.';
    var repoUrl = repo.html_url || '#';
    var homeUrl = LIVE_URL_MAP[name] || repo.homepage || null;
    var lang = repo.language;
    var topics = repo.topics || [];
    var thumbSrc = getThumbnailSrc(name, homeUrl);
    var linkUrl = homeUrl || repoUrl;
    var isLogoThumb = name === 'Event_Funnel';
    var thumbWrapClass = 'project-thumb-wrap' + (isLogoThumb ? ' project-thumb-wrap-logo' : '');
    var thumbImgClass = 'project-thumb-img' + (isLogoThumb ? ' project-thumb-img-logo' : '');

    var techBadges = [lang].filter(Boolean).concat(topics.slice(0, 3)).map(function (t) {
      return '<span class="px-2 py-1 text-xs font-medium rounded bg-gray-700 text-gray-300">' + langToLabel(t) + '</span>';
    }).join(' ');
    if (!techBadges) techBadges = '<span class="px-2 py-1 text-xs font-medium rounded bg-gray-700 text-gray-300">Code</span>';

    var card = document.createElement('div');
    card.className = 'project-card project-card-motion bg-gray-800 rounded-xl overflow-hidden border border-gray-700';
    card.innerHTML =
      '<div class="' + thumbWrapClass + '">' +
        '<a href="' + linkUrl + '" target="_blank" rel="noopener" class="block h-full w-full bg-gray-700">' +
          '<img src="' + thumbSrc + '" alt="' + displayName + '" class="' + thumbImgClass + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';" />' +
          '<div class="project-thumb-fallback" style="display:none;">' + displayName + '</div>' +
        '</a>' +
      '</div>' +
      '<div class="p-5">' +
        '<h3 class="text-lg font-semibold text-white mb-2">' + displayName + '</h3>' +
        '<p class="text-gray-400 text-sm mb-4 line-clamp-3">' + desc + '</p>' +
        '<div class="flex flex-wrap gap-2 mb-4">' + techBadges + '</div>' +
        '<div class="flex gap-3">' +
          (homeUrl ? '<a href="' + homeUrl + '" target="_blank" rel="noopener" class="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline">Live</a>' : '') +
        '</div>' +
      '</div>';
    return card;
  }

  fetch(API_URL)
    .then(function (res) { return res.json(); })
    .then(function (repos) {
      if (loading) loading.remove();
      if (!Array.isArray(repos) || repos.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-gray-400">No public repositories found. Add repos at github.com/' + GITHUB_USER + '</p>';
        return;
      }
      var filtered = repos.filter(function (r) { return REPOS_TO_HIDE.indexOf(r.name) === -1; });
      var ordered = sortRepos(filtered);
      ordered.forEach(function (repo) {
        grid.appendChild(renderProject(repo));
      });
      document.dispatchEvent(new CustomEvent('projects-rendered'));
    })
    .catch(function () {
      if (loading) loading.textContent = 'Could not load projects. Check GitHub username (OthmanEshanouq) or try again later.';
    });
})();
