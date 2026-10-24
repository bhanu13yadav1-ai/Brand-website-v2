# Phase 2 UI/UX Decisions

1. **Keep the existing identity:** black / burgundy panels, rose highlights and gold details remain. This is a refinement, not a brand redesign.
2. **One phone navigation pattern:** phone widths use the existing hamburger menu and its two-column menu grid; the competing horizontal row is hidden only on phone widths. Desktop keeps the horizontal navigation.
3. **Keep old content architecture:** no view IDs, story data, item data, wheel element, or storage key is renamed.
4. **Show reset, don't silently clear:** filter reset controls restore only visible search/filter/sort fields. They never clear saved items or personal notes.
5. **Keyboard and assistive tech:** current-page state is available on both desktop/mobile nav buttons; Escape can close the mobile menu; the destination heading receives focus after a successful navigation; live announcements are concise.
6. **Motion preference:** system reduced-motion setting suppresses non-essential animation and scrolling.
7. **Touch-friendly forms:** input sizing and spacing improve while existing labels and option values remain.
8. **Progressive enhancement:** the additive script exits on duplicate initialization and does not replace `app.js` route/wheel handlers. If the module fails, the original site still has its existing CSS and JS.
9. **Evidence before release:** style tokens and source parsing are testable here; actual device feel and usability require manual human testing.
