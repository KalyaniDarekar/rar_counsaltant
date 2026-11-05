/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#050816',
        secondary: '#0A0F2E',
        'brand-blue': '#0000A0',
        'brand-blue-light': '#2D3FE0',
        'brand-red': '#FF1A1A',
        'text-primary': '#FFFFFF',
        'text-muted': '#A8B0D3',
        'border-subtle': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'blue-glow': '0 0 26px rgba(45,63,224,0.18)',
        'red-glow': '0 10px 30px rgba(255,26,26,0.22)',
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'soft-pulse': 'soft-pulse 2.5s ease-out infinite',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'soft-pulse': {
          '0%': { transform: 'scale(.87)', opacity: '.5' },
          '100%': { transform: 'scale(1.36)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
