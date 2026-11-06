import { createContext, useContext, useEffect, useState } from 'react';

export const THEMES = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Sapphire',
    subtitle: 'Electric Cyan & Deep Tech Azure',
    accentColor: '#00D2FF',
    badgeColor: '#00F0FF',
    isLight: false,
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
  violet: {
    id: 'violet',
    name: 'Royal Violet',
    subtitle: 'Deep Obsidian Plum & Neon Purple',
    accentColor: '#8B5CF6',
    badgeColor: '#A78BFA',
    isLight: false,
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
  emerald: {
    id: 'emerald',
    name: 'Emerald Mint',
    subtitle: 'Growth & Fintech Neon',
    accentColor: '#10B981',
    badgeColor: '#34D399',
    isLight: false,
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
  crimson: {
    id: 'crimson',
    name: 'Tech Crimson',
    subtitle: 'Original Cyber Navy & Red',
    accentColor: '#FF1A1A',
    badgeColor: '#FF3B30',
    isLight: false,
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
  light: {
    id: 'light',
    name: 'Executive Light',
    subtitle: 'Crisp White & Slate Enterprise',
    accentColor: '#2563EB',
    badgeColor: '#1D4ED8',
    isLight: true,
    heroOrb: {
      globe: '#dbeafe',
      wire: '#2563eb',
      nodes: '#1d4ed8',
      ring: '#2563eb',
      ringOuter: '#60a5fa',
      light: '#3b82f6',
      lightSecondary: '#6366f1',
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
      const saved = localStorage.getItem('rar_theme_v2');
      if (saved && THEMES[saved]) return saved;
    } catch {
      // ignore
    }
    return 'cyan'; // Default theme: Cyber Sapphire & Electric Cyan
  });

  const setTheme = (newTheme) => {
    if (!THEMES[newTheme]) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem('rar_theme_v2', newTheme);
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
