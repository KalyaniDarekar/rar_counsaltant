const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = (
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '8b67ad90-469d-40af-b193-a644112dc3db'
).trim();

export function getConsentTimestampIST(date = new Date()) {
  const formatted = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
  return `${formatted} IST`;
}

export async function submitEnquiry(values, { botcheck = '' } = {}) {
  if (botcheck) return { success: true, silent: true };

  if (!ACCESS_KEY) {
    console.warn(
      'RAR Consultant contact form is not configured: set VITE_WEB3FORMS_ACCESS_KEY before launch.',
    );
    return { success: false, reason: 'missing-key' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  const payload = {
    access_key: ACCESS_KEY,
    subject: `New Enquiry from ${values.fullName} – ${values.service} | RAR Consultant Website`,
    from_name: 'RAR Consultant Website',
    name: values.fullName,
    mobile: values.mobile,
    email: values.email,
    service: values.service,
    message: values.message,
    consent: 'Yes',
    consent_timestamp_ist: getConsentTimestampIST(),
    consent_version: 'v1.0',
    botcheck: '',
  };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.success === true) return { success: true };
    console.error('Web3Forms response status:', response.status, data);
    return { success: false, reason: 'provider' };
  } catch (error) {
    console.error('Submission error:', error);
    if (error?.name === 'AbortError') return { success: false, reason: 'timeout' };
    return { success: false, reason: 'network' };
  } finally {
    clearTimeout(timeout);
  }
}
