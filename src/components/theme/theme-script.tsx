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
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />;
}
