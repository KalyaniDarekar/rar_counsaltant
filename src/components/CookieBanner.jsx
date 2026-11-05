import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, Settings2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCookieConsent } from '../hooks/CookieConsent.jsx';

export default function CookieBanner() {
  const {
    visible,
    managing,
    preferences,
    setPreferences,
    acceptAll,
    rejectNonEssential,
    openPreferences,
    save,
  } = useCookieConsent();
  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="cookie-banner"
          role="region"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.24 }}
        >
          <div className="cookie-copy">
            <div className="cookie-heading">
              <span className="cookie-icon">
                <Cookie size={17} aria-hidden="true" />
              </span>
              <h2>{managing ? 'Your privacy choices' : 'Your privacy matters'}</h2>
            </div>
            {!managing ? (
              <p>
                Essential storage keeps this site working. Optional preferences and analytics stay
                off unless you choose them. You can change your choice anytime in Cookie Settings.
                Read our <Link to="/privacy-policy">Privacy Policy</Link>.
              </p>
            ) : (
              <div className="cookie-preferences">
                <label className="preference-row">
                  <span>
                    <strong>Essential</strong>
                    <small>Needed for basic site features; always on.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked
                    disabled
                    aria-label="Essential cookies always active"
                  />
                </label>
                <label className="preference-row">
                  <span>
                    <strong>Preferences</strong>
                    <small>Remember optional interface choices.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        preferences: event.target.checked,
                      }))
                    }
                  />
                </label>
                <label className="preference-row">
                  <span>
                    <strong>Analytics</strong>
                    <small>No analytics are active by default.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(event) =>
                      setPreferences((current) => ({ ...current, analytics: event.target.checked }))
                    }
                  />
                </label>
              </div>
            )}
          </div>
          <div className="cookie-actions">
            {managing ? (
              <>
                <button
                  className="button button-secondary cookie-button"
                  type="button"
                  onClick={rejectNonEssential}
                >
                  <ShieldCheck size={15} />
                  Reject non-essential
                </button>
                <button
                  className="button button-primary cookie-button"
                  type="button"
                  onClick={() => save(preferences)}
                >
                  <Settings2 size={15} />
                  Save preferences
                </button>
              </>
            ) : (
              <>
                <button
                  className="button button-secondary cookie-button"
                  type="button"
                  onClick={rejectNonEssential}
                >
                  Reject Non-Essential
                </button>
                <button
                  className="button button-secondary cookie-button"
                  type="button"
                  onClick={openPreferences}
                >
                  Manage Preferences
                </button>
                <button
                  className="button button-primary cookie-button"
                  type="button"
                  onClick={acceptAll}
                >
                  Accept All
                </button>
              </>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
