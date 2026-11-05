import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CONSENT_KEY = 'rar-cookie-preferences-v1';
const initialPreferences = { essential: true, analytics: false, preferences: false };
const CookieConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (!saved) {
        setVisible(true);
      } else {
        const parsed = JSON.parse(saved);
        setPreferences({
          essential: true,
          analytics: parsed.analytics === true,
          preferences: parsed.preferences === true,
        });
      }
    } catch {
      setVisible(true);
    }
    setReady(true);
  }, []);

  const save = useCallback((next) => {
    const record = {
      essential: true,
      analytics: next.analytics === true,
      preferences: next.preferences === true,
      timestamp: new Date().toISOString(),
    };
    setPreferences(record);
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    } catch {
      // Consent can still be applied for this visit when storage is unavailable.
    }
    setVisible(false);
    setManaging(false);
    // Add future analytics here only after a stored, explicit opt-in has been read.
  }, []);

  const acceptAll = useCallback(() => save({ analytics: true, preferences: true }), [save]);
  const rejectNonEssential = useCallback(() => save(initialPreferences), [save]);
  const reopen = useCallback(() => {
    setVisible(true);
    setManaging(false);
  }, []);
  const openPreferences = useCallback(() => {
    setVisible(true);
    setManaging(true);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      visible,
      managing,
      ready,
      setPreferences,
      acceptAll,
      rejectNonEssential,
      reopen,
      openPreferences,
      save,
    }),
    [
      preferences,
      visible,
      managing,
      ready,
      acceptAll,
      rejectNonEssential,
      reopen,
      openPreferences,
      save,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error('useCookieConsent must be used inside CookieConsentProvider.');
  return context;
}
