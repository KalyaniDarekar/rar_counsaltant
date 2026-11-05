import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, LoaderCircle, MessageCircle, Send } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { services, serviceBySlug } from '../config/services.js';
import { company } from '../config/company.js';
import { enquirySchema, normalizeMobileInput, sanitizeDescription } from '../lib/validation.js';
import { submitEnquiry } from '../lib/submitForm.js';

const THROTTLE_KEY = 'rar-enquiry-last-submit-v1';
const THROTTLE_MS = 60_000;

function getRemainingThrottle() {
  try {
    const last = Number(window.localStorage.getItem(THROTTLE_KEY));
    return Number.isFinite(last) && last > 0 ? Math.max(0, THROTTLE_MS - (Date.now() - last)) : 0;
  } catch {
    return 0;
  }
}

function FieldError({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          className="field-error"
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.16 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FieldCheck({ show }) {
  return show ? <Check className="field-valid-icon" size={16} aria-label="Valid" /> : null;
}

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') ?? '';
  const allowedService =
    serviceBySlug[initialService]?.title ??
    (services.some((service) => service.title === initialService) ? initialService : '');
  const [botcheck, setBotcheck] = useState('');
  const [status, setStatus] = useState('idle');
  const [failureReason, setFailureReason] = useState('');
  const [toast, setToast] = useState('');
  const [remaining, setRemaining] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      service: allowedService,
      message: '',
      consent: false,
    },
  });
  const messageValue = useWatch({ control, name: 'message', defaultValue: '' });
  const messageCount = useMemo(
    () => sanitizeDescription(messageValue ?? '').length,
    [messageValue],
  );

  useEffect(() => {
    const update = () => setRemaining(getRemainingThrottle());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const onSubmit = async (values) => {
    setStatus('loading');
    setFailureReason('');

    const result = await submitEnquiry(values, { botcheck });
    if (result.success) {
      try {
        window.localStorage.setItem(THROTTLE_KEY, String(Date.now()));
      } catch {
        // The throttle remains best-effort when browser storage is unavailable.
      }
      setRemaining(THROTTLE_MS);
      setStatus('success');
      setToast('Thank you! We will contact you within 24 hours.');
      setBotcheck('');
      reset({ fullName: '', mobile: '', email: '', service: '', message: '', consent: false });
      return;
    }
    setStatus('error');
    setFailureReason(result.reason ?? 'provider');
    setToast('We couldn’t send your enquiry. See the message below for contact alternatives.');
  };

  const submitDisabled = isSubmitting || status === 'loading' || remaining > 0;
  const serviceField = register('service');
  const mobileField = register('mobile');

  const valid = (field) => Boolean(touchedFields[field] && !errors[field]);
  const errorMessage =
    failureReason === 'missing-key'
      ? 'Our online enquiry form is being configured. Please contact us using WhatsApp or phone below.'
      : failureReason === 'timeout'
        ? 'The request took longer than expected, so we could not confirm delivery.'
        : failureReason === 'network'
          ? 'We could not connect to the enquiry service. Please try again later.'
          : 'We could not send your enquiry right now. Please try again or use the contact options below.';

  return (
    <section className="contact-form-card glass-card" aria-labelledby="form-title">
      <div className="form-card-heading">
        <p className="eyebrow">A good first step</p>
        <h2 id="form-title">
          Tell us what you <span className="text-gradient">need.</span>
        </h2>
        <p>
          Share a few details. We’ll use them only to respond to your enquiry and prepare a relevant
          quote.
        </p>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className={`form-toast${status === 'error' ? ' form-toast-error' : ''}`}
            role={status === 'error' ? 'alert' : 'status'}
            initial={{ opacity: 0, y: -9 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.2 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            className="form-result form-result-success"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <span className="result-icon">
              <Check size={25} aria-hidden="true" />
            </span>
            <h3>Thank you! We will contact you within 24 hours.</h3>
            <p>Your enquiry has been sent. We appreciate you getting in touch.</p>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            className="form-result form-result-error"
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <h3>We couldn’t send your enquiry.</h3>
            <p>{errorMessage}</p>
            <p className="fallback-contact">
              Reach us directly:{' '}
              <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>{' '}
              or <a href="tel:+919158030333">{company.phoneDisplay}</a>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="company-website">Leave this field empty</label>
          <input
            id="company-website"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            value={botcheck}
            onChange={(event) => setBotcheck(event.target.value)}
          />
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="fullName">
              Full name <span aria-hidden="true">*</span>
            </label>
            <div
              className={`input-wrap${errors.fullName ? ' has-error' : ''}${valid('fullName') ? ' is-valid' : ''}`}
            >
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="e.g. Asha Sharma"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                {...register('fullName')}
              />
              <FieldCheck show={valid('fullName')} />
            </div>
            <FieldError id="fullName-error" message={errors.fullName?.message} />
          </div>
          <div className="form-field">
            <label htmlFor="mobile">
              Mobile number <span aria-hidden="true">*</span>
            </label>
            <div
              className={`input-wrap phone-input-wrap${errors.mobile ? ' has-error' : ''}${valid('mobile') ? ' is-valid' : ''}`}
            >
              <span className="phone-prefix" aria-hidden="true">
                +91
              </span>
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="91580 30333"
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={errors.mobile ? 'mobile-error' : 'mobile-hint'}
                {...mobileField}
                onChange={(event) => {
                  event.target.value = normalizeMobileInput(event.target.value);
                  mobileField.onChange(event);
                }}
              />
              <FieldCheck show={valid('mobile')} />
            </div>
            {!errors.mobile && (
              <p id="mobile-hint" className="field-hint">
                Enter 10 digits. Optional +91 or 0 prefix is accepted.
              </p>
            )}
            <FieldError id="mobile-error" message={errors.mobile?.message} />
          </div>
          <div className="form-field">
            <label htmlFor="email">
              Email address <span aria-hidden="true">*</span>
            </label>
            <div
              className={`input-wrap${errors.email ? ' has-error' : ''}${valid('email') ? ' is-valid' : ''}`}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={100}
                placeholder="you@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
              <FieldCheck show={valid('email')} />
            </div>
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
          <div className="form-field">
            <label htmlFor="service">
              Select service <span aria-hidden="true">*</span>
            </label>
            <div
              className={`input-wrap select-wrap${errors.service ? ' has-error' : ''}${valid('service') ? ' is-valid' : ''}`}
            >
              <select
                id="service"
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? 'service-error' : undefined}
                {...serviceField}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
              <FieldCheck show={valid('service')} />
            </div>
            <FieldError id="service-error" message={errors.service?.message} />
          </div>
          <div className="form-field form-field-full">
            <label htmlFor="message">
              Short description <span aria-hidden="true">*</span>
            </label>
            <div
              className={`input-wrap textarea-wrap${errors.message ? ' has-error' : ''}${valid('message') ? ' is-valid' : ''}`}
            >
              <textarea
                id="message"
                rows="5"
                maxLength={500}
                placeholder="What would you like to build or improve?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? 'message-error message-count' : 'message-hint message-count'
                }
                {...register('message')}
              />
              <span
                id="message-count"
                className={`character-count${messageCount > 470 ? ' character-count-near-limit' : ''}`}
              >
                {messageCount}/500
              </span>
            </div>
            {!errors.message && (
              <p id="message-hint" className="field-hint">
                Please share 5–500 characters so we can understand your needs.
              </p>
            )}
            <FieldError id="message-error" message={errors.message?.message} />
          </div>
        </div>

        <div className="consent-block">
          <label className="consent-label" htmlFor="consent-checkbox">
            <input
              id="consent-checkbox"
              type="checkbox"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              {...register('consent')}
            />
            <span className="consent-box" aria-hidden="true">
              <Check size={13} />
            </span>
            <span>
              I have read and agree to the{' '}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </Link>
              , and I consent to RAR Consultant processing my personal data to respond to my
              enquiry.
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent?.message} />
          <p className="processor-notice">
            Your enquiry details are transmitted through Web3Forms, a third-party form service
            acting as a Data Processor. It may process your data on servers outside India.
          </p>
        </div>

        {remaining > 0 && status !== 'loading' && (
          <p className="throttle-note" role="status">
            Please wait {Math.ceil(remaining / 1000)} seconds before sending another enquiry.
          </p>
        )}
        <button
          className="button button-primary form-submit"
          type="submit"
          disabled={submitDisabled}
        >
          {isSubmitting || status === 'loading' ? (
            <>
              <LoaderCircle className="spin" size={18} aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry <Send size={16} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="form-privacy-note">
          <MessageCircle size={14} aria-hidden="true" /> We use your details only to respond to this
          enquiry and provide a relevant quote.
        </p>
        <div className="form-direct-links">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <span aria-hidden="true">·</span>
          <Link to="/privacy-policy">How we handle your data</Link>
        </div>
      </form>
    </section>
  );
}
