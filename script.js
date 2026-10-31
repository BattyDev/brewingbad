(() => {
  const clips = [...document.querySelectorAll('[data-loop-clip]')];
  const visible = new Set();
  const userPaused = new WeakSet();
  const automaticPauses = new WeakSet();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.getElementById('auto-play');
  let autoPlay = !reducedMotion.matches && !navigator.connection?.saveData;
  let explicitPreference = false;

  function pauseAutomatically(video) {
    if (!video.paused) { automaticPauses.add(video); video.pause(); }
  }
  function playIfAllowed(video) {
    if (autoPlay && !document.hidden && visible.has(video) && !userPaused.has(video)) {
      video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
    }
  }
  function updateMotionButton() {
    motionButton.setAttribute('aria-pressed', String(autoPlay));
    motionButton.textContent = 'Auto-play clips: ' + (autoPlay ? 'on' : 'off');
  }
  clips.forEach(video => {
    video.muted = true;
    video.addEventListener('pause', () => {
      if (!automaticPauses.delete(video)) userPaused.add(video);
    });
    video.addEventListener('play', () => {
      // Loading a new source can discard the old queued pause event.
      automaticPauses.delete(video);
      userPaused.delete(video);
    });
  });

  // Download/play only clips the visitor reaches; stop offscreen work.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target: video, isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio >= .2) {
          visible.add(video); playIfAllowed(video);
        } else {
          visible.delete(video); pauseAutomatically(video);
        }
      });
    }, { threshold: [0, .2] });
    clips.forEach(video => observer.observe(video));
  } else autoPlay = false;
  updateMotionButton();
  motionButton.addEventListener('click', () => {
    explicitPreference = true;
    autoPlay = !autoPlay;
    updateMotionButton();
    clips.forEach(video => {
      if (autoPlay) { userPaused.delete(video); playIfAllowed(video); }
      else pauseAutomatically(video);
    });
  });
  reducedMotion.addEventListener('change', () => {
    if (explicitPreference) return;
    autoPlay = !reducedMotion.matches && !navigator.connection?.saveData;
    updateMotionButton();
    clips.forEach(video => autoPlay ? playIfAllowed(video) : pauseAutomatically(video));
  });
  document.addEventListener('visibilitychange', () => {
    clips.forEach(video => document.hidden ? pauseAutomatically(video) : playIfAllowed(video));
  });

  const steps = {
    grow: ['harvesting', 'Start with something green.', 'Tend your planters, water your herbs, and harvest them part by part. There are more ingredients to find beyond your own front door.', 'Harvest bogmint by trimming ripe parts from the planter.'],
    prep: ['grinding', 'A recipe is only the beginning.', 'Circle the pestle to grind leaves into mash. Make deliberate cuts to prepare roots and mushrooms. Your tools follow your input.', 'Circle the pestle to grind leaves into prepared mash.'],
    brew: ['stirring', 'Put a little effort in the pot.', 'Load your prepared ingredients, light the fire, and work the spoon. Give the batch time to extract before you reach for a bottle.', 'Work the spoon over the lit copper brewing pot.'],
    bottle: ['bottling', 'Make every drop count.', 'Tip the pot, pour to the gold mark, and cork the bottle. A remedy is only a finished item once you have sealed it.', 'Tip the cauldron, fill a bottle to its mark, and finish the bottle.']
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
    pauseAutomatically(processVideo);
    userPaused.delete(processVideo);
    processVideo.poster = 'assets/workshop/' + file + '.webp';
    processVideo.querySelector('source').src = 'assets/workshop/' + file + '.mp4';
    processVideo.querySelector('a').href = 'assets/workshop/' + file + '.mp4';
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
