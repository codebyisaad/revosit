/**
 * Runs before first paint, so the page never flashes the wrong theme.
 *
 * Kept as a raw string rather than a component body: it has to execute
 * synchronously in the document head, before React exists.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    var root = document.documentElement;
    root.classList.toggle('dark', dark);
    // Suppress the colour transition for the initial paint only, otherwise
    // every element animates from its default on load.
    root.classList.add('theme-boot');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.remove('theme-boot');
      });
    });

    // The intro only plays on the first page of a session, and never for
    // someone who has asked for reduced motion. Decided here rather than in
    // React so the overlay is painted with the very first frame instead of
    // appearing on top of content that has already rendered.
    var seen = sessionStorage.getItem('splash-seen');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !reduced) root.classList.add('splash-active');
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />;
}
