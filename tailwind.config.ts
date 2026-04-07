import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            colors: {
                primary: {
                    DEFAULT: '#0F766E',
                    50: '#F0FDFA',
                    100: '#CCFBF1',
                    200: '#99F6E4',
                    300: '#5EEAD4',
                    400: '#2DD4BF',
                    500: '#0F766E',
                    600: '#0D5C56',
                    700: '#134E4A',
                    glow: '#0F766E1F'
                },
                dark: {
                    bg: '#0F172A',
                    surface: '#111827',
                    card: '#1E293B',
                    border: '#334155',
                    text: '#E5E7EB',
                    muted: '#94A3B8'
                }
            },
            boxShadow: {
                'luxury': '0 10px 30px -18px rgba(15, 118, 110, 0.45)',
                'card': '0 1px 2px rgba(15, 23, 42, 0.06), 0 10px 30px -24px rgba(15, 23, 42, 0.25)',
                'card-hover': '0 8px 24px -18px rgba(15, 23, 42, 0.2)',
            },
            borderRadius: {
                'card': '16px',
            }
        }
    }
}
