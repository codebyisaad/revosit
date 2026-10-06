import Script from "next/script";

const script = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    var root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.classList.add('theme-boot');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.remove('theme-boot');
      });
    });
    var seen = sessionStorage.getItem('splash-seen');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !reduced) root.classList.add('splash-active');
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="theme-boot" strategy="beforeInteractive">
      {script}
    </Script>
  );
}
