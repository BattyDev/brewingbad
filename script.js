(() => {
  const clips = [...document.querySelectorAll('[data-loop-clip]')];
  const visible = new Set();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const allowsMotion = () => !reducedMotion.matches && !navigator.connection?.saveData;

  function playIfAllowed(video) {
    if (allowsMotion() && !document.hidden && visible.has(video)) {
      video.play().catch(() => { /* Keep the capture poster if autoplay is blocked. */ });
    } else video.pause();
  }
  clips.forEach(video => { video.muted = true; });

  // Treat captures like animated artwork; download and animate only in view.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target: video, isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio >= .2) visible.add(video);
        else visible.delete(video);
        playIfAllowed(video);
      });
    }, { threshold: [0, .2] });
    clips.forEach(video => observer.observe(video));
  } else {
    clips.forEach(video => { visible.add(video); playIfAllowed(video); });
  }
  reducedMotion.addEventListener('change', () => clips.forEach(playIfAllowed));
  document.addEventListener('visibilitychange', () => clips.forEach(playIfAllowed));

  const steps = {
    grow: ['harvesting', 'Start with something green.', 'Water your herbs, then snip them leaf by leaf.', 'Snip a grown bogmint plant leaf by leaf.'],
    prep: ['grinding', 'A recipe is only the beginning.', 'Lay fresh herbs on the bench’s left tray, then circle the pestle to grind leaves into mash, or cut roots and mushrooms at the marks. Prepared portions wait on the right tray.', 'Circle the pestle to grind leaves into prepared mash.'],
    brew: ['stirring', 'Put a little effort in the pot.', 'Set your prepared ingredients and empty bottles on the cauldron’s trays, tip the ingredients in, strike the flint and work the spoon.', 'Work the spoon round the lit cauldron.'],
    bottle: ['bottling', 'Make every drop count.', 'Dip the ladle, pour into the bottle under the funnel, and cork it. A remedy is only a finished item once you have sealed it.', 'Ladle the brew into a bottle under the funnel, then cork it.']
  };
  const tabs = [...document.querySelectorAll('[role=tab]')];
  const processVideo = document.getElementById('process-video');
  function selectStep(tab) {
    if (tab.getAttribute('aria-selected') === 'true') return;
    tabs.forEach(item => {
      item.setAttribute('aria-selected', String(item === tab));
      item.tabIndex = item === tab ? 0 : -1;
    });
    const [file, title, copy, label] = steps[tab.dataset.step];
    processVideo.pause();
    processVideo.poster = 'assets/film/' + file + '.webp';
    processVideo.querySelector('source').src = 'assets/film/' + file + '.mp4';
    processVideo.querySelector('a').href = 'assets/film/' + file + '.mp4';
    processVideo.setAttribute('aria-label', label);
    processVideo.load();
    document.getElementById('process-title').textContent = title;
    document.getElementById('process-copy').textContent = copy;
    document.getElementById('process-panel').setAttribute('aria-labelledby', tab.id);
    playIfAllowed(processVideo);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStep(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectStep(tabs[next]); tabs[next].focus(); }
    });
  });

  const config = window.BREWING_BAD_DEMO;
  if (config && config.url) {
    try {
      const url = new URL(config.url, location.href);
      if (!['http:', 'https:'].includes(url.protocol)) return;
      const download = document.getElementById('download-demo');
      download.href = url.href; download.textContent = config.label || 'Download the Windows demo';
      document.querySelectorAll('[data-demo-cta]').forEach(link => { link.textContent = 'Get the demo ↗'; });
      document.getElementById('demo-description').textContent = 'Your first batch starts here. Download the Windows demo and get to work in the Tallow Ward.';
      document.getElementById('demo-status').textContent = config.details || 'WINDOWS PC DEMO';
      document.querySelector('.demo-honesty').hidden = true;
      document.querySelectorAll('.faq details')[1].querySelector('p').textContent = 'The Windows PC demo is available now. Use the download link in the demo section to get the current build.';
    } catch { /* Keep the coming-soon state when the download URL is invalid. */ }
  }
})();
