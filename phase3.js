/* BLACKED V1 Phase 3 — Information architecture & collection previews.
 * Additive only: keeps the original six views and existing gallery/product logic.
 */
(() => {
  'use strict';
  if (document.documentElement.dataset.blackedPhase3 === 'ready') return;
  document.documentElement.dataset.blackedPhase3 = 'ready';

  const status = window.BLACKED_PHASE3 = {
    version: '3.0.0',
    initialized: false,
    directoryInserted: false,
    sanskariPagePreserved: false,
    muslimPreviewUpdated: false,
    christianPreviewUpdated: false,
    navAccessibilitySync: false,
    errors: []
  };

  const COLLECTIONS_MARKUP = `
    <section class="p3-collections" id="phase3-collection-directory" aria-labelledby="p3-collections-title">
      <div class="p3-collections__heading">
        <p class="eyebrow">Collections · clear and considered</p>
        <h2 id="p3-collections-title">Explore the edits</h2>
        <p class="muted">One active collection and two upcoming creative directions. Coming Soon previews are informational, not live shops.</p>
      </div>
      <div class="p3-collections__grid">
        <article class="p3-collection-card p3-collection-card--active">
          <div class="p3-collection-card__media"><img src="assets/campaign-sanskari-raat.webp" loading="lazy" decoding="async" alt="Sanskari Edit campaign artwork in navy and gold"></div>
          <div class="p3-collection-card__body"><span class="p3-collection-status p3-collection-status--live">Available to explore</span><h3>Sanskari Collection</h3><p>Campaign looks, elegant styling references and a dedicated gallery already inside this website.</p><button class="btn primary p3-collection-card__action" type="button" data-phase3-open="sanskari">Explore Sanskari <span aria-hidden="true">↗</span></button></div>
        </article>
        <article class="p3-collection-card p3-collection-card--soon p3-collection-card--noor" aria-label="Muslim-Inspired Collection — Coming Soon">
          <div class="p3-collection-card__art" aria-hidden="true"><span class="p3-art-mark">✧</span><span class="p3-art-orbit"></span></div>
          <div class="p3-collection-card__body"><span class="p3-collection-status">Coming Soon</span><h3>Muslim-Inspired Collection</h3><p>Noor Edit · a future modest-fashion direction, to be developed with respectful feedback and suitable approved artwork.</p><span class="p3-preview-note">Preview only · not yet available</span></div>
        </article>
        <article class="p3-collection-card p3-collection-card--soon p3-collection-card--grace" aria-label="Christian-Inspired Collection — Coming Soon">
          <div class="p3-collection-card__art" aria-hidden="true"><span class="p3-art-mark">✦</span><span class="p3-art-bloom"></span></div>
          <div class="p3-collection-card__body"><span class="p3-collection-status">Coming Soon</span><h3>Christian-Inspired Collection</h3><p>Grace Edit · a future classic-romance direction, to be developed thoughtfully without claiming to represent every community.</p><span class="p3-preview-note">Preview only · not yet available</span></div>
        </article>
      </div>
      <p class="p3-collection-footnote">The upcoming collections are creative mood-board directions, not statements about what people of any faith prefer. They are not available for browsing or purchase yet.</p>
    </section>`;

  function insertCollectionDirectory() {
    const home = document.querySelector('#view-home');
    const destinationGrid = home && home.querySelector('.destination-grid');
    if (!home || !destinationGrid) {
      status.errors.push('Could not find #view-home .destination-grid; collection directory was not inserted.');
      return false;
    }
    if (document.getElementById('phase3-collection-directory')) {
      status.directoryInserted = true;
      return true;
    }
    destinationGrid.insertAdjacentHTML('afterend', COLLECTIONS_MARKUP);
    status.directoryInserted = !!document.getElementById('phase3-collection-directory');
    return status.directoryInserted;
  }

  function updateComingSoonCards() {
    const view = document.querySelector('#view-sanskari');
    if (!view) {
      status.errors.push('Could not find #view-sanskari; existing collection preview labels were not updated.');
      return;
    }
    const noor = view.querySelector('.coming-card.noor');
    const grace = view.querySelector('.coming-card.grace');
    if (noor) {
      const eyebrow = noor.querySelector('.eyebrow');
      if (eyebrow) eyebrow.textContent = 'MUSLIM-INSPIRED COLLECTION · NOOR EDIT';
      const copy = noor.querySelector('h3 + p');
      if (copy) copy.textContent = 'A future modest-fashion direction focused on considered coverage, fabric, and individual style—developed with respectful audience feedback.';
      const pill = noor.querySelector('.coming-pill');
      if (pill) pill.textContent = 'COMING SOON';
      noor.setAttribute('aria-label', 'Muslim-Inspired Collection — Coming Soon');
      noor.setAttribute('data-phase3-preview', 'muslim-inspired');
      status.muslimPreviewUpdated = true;
    } else status.errors.push('Existing .coming-card.noor preview was not found.');
    if (grace) {
      const eyebrow = grace.querySelector('.eyebrow');
      if (eyebrow) eyebrow.textContent = 'CHRISTIAN-INSPIRED COLLECTION · GRACE EDIT';
      const copy = grace.querySelector('h3 + p');
      if (copy) copy.textContent = 'A future classic-romance direction with thoughtful styling and campaign storytelling—without claiming to represent every Christian community.';
      const pill = grace.querySelector('.coming-pill');
      if (pill) pill.textContent = 'COMING SOON';
      grace.setAttribute('aria-label', 'Christian-Inspired Collection — Coming Soon');
      grace.setAttribute('data-phase3-preview', 'christian-inspired');
      status.christianPreviewUpdated = true;
    } else status.errors.push('Existing .coming-card.grace preview was not found.');
    const note = view.querySelector('.coming-grid + .disclaimer');
    if (note) note.textContent = 'Noor and Grace are creative working titles for future faith-inspired fashion directions. These concepts do not represent every Muslim or Christian community, and religion does not determine an individual’s style or private interests.';
    status.sanskariPagePreserved = !!view.querySelector('#sanskariGallery');
  }

  function syncNavigationAccessibility() {
    const activeView = document.querySelector('.view.active[data-view]');
    if (!activeView) return;
    const activeName = activeView.dataset.view;
    document.querySelectorAll('[data-view-link]').forEach(button => {
      if (button.dataset.viewLink === activeName) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    status.navAccessibilitySync = true;
  }

  function wireCollectionAction() {
    // One delegated listener; re-running Phase 3 does not attach duplicate handlers.
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-phase3-open]');
      if (!button) return;
      const destination = button.dataset.phase3Open;
      if (destination !== 'sanskari') return;
      const canonicalNav = document.querySelector('#mainNav [data-view-link="sanskari"]');
      if (canonicalNav) canonicalNav.click();
      else status.errors.push('Canonical Sanskari navigation button was not found.');
    });
  }

  function observeActiveViews() {
    const views = document.querySelectorAll('.view');
    if (!views.length || !('MutationObserver' in window)) { syncNavigationAccessibility(); return; }
    const observer = new MutationObserver(syncNavigationAccessibility);
    views.forEach(view => observer.observe(view, {attributes: true, attributeFilter: ['class']}));
    syncNavigationAccessibility();
  }

  function init() {
    if (status.initialized) return status;
    try {
      insertCollectionDirectory();
      updateComingSoonCards();
      wireCollectionAction();
      observeActiveViews();
      status.initialized = true;
    } catch (error) {
      status.errors.push(String(error));
      console.error('[BLACKED Phase 3] Initialization error', error);
    }
    return status;
  }

  status.recheck = () => {
    status.directoryInserted = !!document.getElementById('phase3-collection-directory');
    status.sanskariPagePreserved = !!document.querySelector('#view-sanskari #sanskariGallery');
    status.muslimPreviewUpdated = !!document.querySelector('#view-sanskari [data-phase3-preview="muslim-inspired"]');
    status.christianPreviewUpdated = !!document.querySelector('#view-sanskari [data-phase3-preview="christian-inspired"]');
    return status;
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
