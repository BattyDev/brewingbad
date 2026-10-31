(() => {
  const steps = {
    grow: ['harvest.webp', 'Start with something green.', 'Tend your planters, water your herbs, and harvest them part by part. There are more ingredients to find beyond your own front door.', 'First-person harvesting of bogmint at a workshop planter.'],
    prep: ['grinding.webp', 'A recipe is only the beginning.', 'Circle the pestle to grind leaves into mash. Make deliberate cuts to prepare roots and mushrooms. Your tools follow your input.', 'Grinding bogmint in a mortar with a pestle.'],
    brew: ['brewing.webp', 'Put a little effort in the pot.', 'Load your prepared ingredients, light the fire, and work the spoon. Give the batch time to extract before you reach for a bottle.', 'Stirring a green remedy in a copper brewing pot.'],
    bottle: ['bottling.webp', 'Make every drop count.', 'Pour to the gold mark, release, and cork the bottle. A remedy is only a finished item once you have sealed it.', 'Filling a remedy bottle toward its marked target level.']
  };
  const tabs = [...document.querySelectorAll('[role=tab]')];
  function selectStep(tab) {
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    const [file, title, copy, alt] = steps[tab.dataset.step];
    const image = document.getElementById('process-image');
    image.src = 'assets/' + file; image.alt = alt;
    document.getElementById('process-title').textContent = title;
    document.getElementById('process-copy').textContent = copy;
    document.getElementById('process-panel').setAttribute('aria-labelledby', tab.id);
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
  const dialog = document.getElementById('image-dialog');
  document.querySelectorAll('[data-open-image]').forEach(button => button.addEventListener('click', () => {
    const source = button.querySelector('img');
    const image = document.getElementById('dialog-image');
    image.src = source.currentSrc || source.src; image.alt = source.alt;
    document.getElementById('dialog-caption').textContent = source.alt + ' Development build; visuals may change.';
    dialog.showModal();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  const config = window.BREWING_BAD_DEMO;
  if (config && config.url) {
    try {
      const url = new URL(config.url, location.href);
      // A typo must never turn the public download CTA into an executable script URL.
      if (!['http:', 'https:'].includes(url.protocol)) return;
      const download = document.getElementById('download-demo');
      download.href = url.href; download.textContent = config.label || 'Download the Windows demo';
      document.querySelectorAll('[data-demo-cta]').forEach(link => { link.textContent = 'Get the demo ↗'; });
      document.getElementById('demo-description').textContent = 'Your first batch starts here. Download the Windows demo and get to work in the Tallow Ward.';
      document.getElementById('demo-status').textContent = config.details || 'WINDOWS PC DEMO';
      document.querySelector('.demo-honesty').hidden = true;
      document.querySelectorAll('.faq details')[1].querySelector('p').textContent = 'The Windows PC demo is available now. Use the download link in the demo section to get the current build.';
    } catch { /* Keep the coming-soon state if the download configuration is invalid. */ }
  }
})();
