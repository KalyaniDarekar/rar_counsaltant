import { createContext, useContext, useEffect, useState } from 'react';

export const THEMES = {
  cyan: {
    id: 'cyan',
    name: 'Sapphire Cyan',
    subtitle: 'Modern Cloud & AI',
    accentColor: '#00D2FF',
    badgeColor: '#00F0FF',
    heroOrb: {
      globe: '#0a2540',
      wire: '#0284c7',
      nodes: '#90e0ef',
      ring: '#00f0ff',
      ringOuter: '#0284c7',
      light: '#00f0ff',
      lightSecondary: '#38bdf8',
    },
  },
  crimson: {
    id: 'crimson',
    name: 'Tech Crimson',
    subtitle: 'High-Impact Cyber',
    accentColor: '#FF1A1A',
    badgeColor: '#FF3B30',
    heroOrb: {
      globe: '#101a66',
      wire: '#4867ff',
      nodes: '#a3b1ff',
      ring: '#ff2a2a',
      ringOuter: '#5470ff',
      light: '#ff3434',
      lightSecondary: '#7588ff',
    },
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Mint',
    subtitle: 'Growth & Fintech',
    accentColor: '#10B981',
    badgeColor: '#34D399',
    heroOrb: {
      globe: '#06261c',
      wire: '#059669',
      nodes: '#a7f3d0',
      ring: '#34d399',
      ringOuter: '#059669',
      light: '#10b981',
      lightSecondary: '#6ee7b7',
    },
  },
  violet: {
    id: 'violet',
    name: 'Royal Violet',
    subtitle: 'Creative Enterprise',
    accentColor: '#8B5CF6',
    badgeColor: '#A78BFA',
    heroOrb: {
      globe: '#1a103c',
      wire: '#7c3aed',
      nodes: '#ddd6fe',
      ring: '#c084fc',
      ringOuter: '#6366f1',
      light: '#a855f7',
      lightSecondary: '#818cf8',
    },
  },
};

const ThemeContext = createContext({
  theme: 'cyan',
  themeConfig: THEMES.cyan,
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'cyan';
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme');
      if (urlTheme && THEMES[urlTheme]) return urlTheme;
      const saved = localStorage.getItem('rar_theme');
      if (saved && THEMES[saved]) return saved;
    } catch {
      // ignore
    }
    return 'cyan'; // Default theme is now Cyan & Sapphire (Option 2)
  });

  const setTheme = (newTheme) => {
    if (!THEMES[newTheme]) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem('rar_theme', newTheme);
      // Optional: keep URL param in sync if present
      const url = new URL(window.location.href);
      if (url.searchParams.has('theme')) {
        url.searchParams.set('theme', newTheme);
        window.history.replaceState(null, '', url.toString());
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    themeConfig: THEMES[theme] || THEMES.cyan,
    setTheme,
    themes: THEMES,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

