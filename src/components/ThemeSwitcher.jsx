import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="theme-switcher-container" aria-label="Theme Selection Control">
      <AnimatePresence>
        {expanded ? (
          <motion.div
            className="theme-switcher-panel glass-card"
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="theme-switcher-header">
              <div className="theme-switcher-title">
                <Sparkles size={14} className="theme-sparkle-icon" />
                <span>Client Design Choices</span>
              </div>
              <button
                type="button"
                className="theme-collapse-btn"
                onClick={() => setExpanded(false)}
                title="Minimize Theme Panel"
              >
                <ChevronDown size={14} />
              </button>
            </div>
            <p className="theme-switcher-desc">
              Select a color combination to compare different brand aesthetics:
            </p>
            <div className="theme-options-grid">
              {Object.values(themes).map((t) => {
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`theme-option-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setTheme(t.id)}
                  >
                    <span
                      className="theme-color-dot"
                      style={{ background: t.accentColor, boxShadow: `0 0 10px ${t.accentColor}` }}
                    />
                    <div className="theme-btn-text">
                      <span className="theme-btn-name">{t.name}</span>
                      <span className="theme-btn-sub">{t.subtitle}</span>
                    </div>
                    {isActive && <Check size={14} className="theme-check-icon" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            className="theme-toggle-pill glass-card"
            onClick={() => setExpanded(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Choose Theme / Color Scheme"
          >
            <span
              className="theme-pill-dot"
              style={{
                background: themes[theme]?.accentColor || '#00d2ff',
                boxShadow: `0 0 8px ${themes[theme]?.accentColor || '#00d2ff'}`,
              }}
            />
            <span className="theme-pill-label">Theme: {themes[theme]?.name}</span>
            <ChevronUp size={13} className="theme-pill-chevron" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

