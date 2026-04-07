<template>
  <div class="min-h-screen bg-[var(--app-bg)] text-slate-900 dark:bg-dark-bg dark:text-dark-text font-sans transition-colors duration-300 selection:bg-primary-500 selection:text-white">
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap');

:root {
  --app-bg: #f8fafc;
  --app-surface: #ffffff;
  --app-border: #e2e8f0;
}

html {
  background: var(--app-bg);
}

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(15, 118, 110, 0.05), transparent 26%),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.dark body {
  background:
    radial-gradient(circle at top left, rgba(45, 212, 191, 0.08), transparent 22%),
    linear-gradient(180deg, #0f172a 0%, #111827 100%);
}
</style>
