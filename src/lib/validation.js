import { z } from 'zod';
import { services } from '../config/services.js';

const serviceNames = services.map((service) => service.title);

export function sanitizeDescription(value = '') {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeMobileInput(value = '') {
  return value.replace(/[^\d+\s-]/g, '').replace(/(?!^)\+/g, '');
}

export function normalizeIndianMobile(value = '') {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) return `+91${digits.slice(1)}`;
  const compact = value.replace(/[\s-]/g, '').trim();
  return compact.startsWith('+') ? compact : `+${compact}`;
}

const nameSchema = z
  .string()
  .transform((value) => value.trim().replace(/[’]/g, "'"))
  .pipe(
    z
      .string()
      .min(2, 'Please enter at least 2 characters.')
      .max(60, 'Please keep your name under 60 characters.')
      .regex(/^[\p{L} .'-]+$/u, 'Use letters, spaces, dots, hyphens, or apostrophes only.')
      .refine((value) => /\p{L}/u.test(value), 'Please include your name.'),
  );

const mobileSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(
    z
      .string()
      .min(10, 'Please enter a valid 10-digit mobile number.')
      .max(20, 'Phone number must be under 20 characters.')
      .refine(
        (value) => {
          const digits = value.replace(/\D/g, '');
          return (
            digits.length === 10 ||
            (digits.length === 12 && digits.startsWith('91')) ||
            (digits.length === 11 && digits.startsWith('0')) ||
            digits.length >= 10
          );
        },
        'Enter a valid 10-digit mobile number.',
      ),
  );

const emailSchema = z
  .string()
  .transform((value) => value.trim().toLowerCase())
  .pipe(
    z
      .string()
      .max(100, 'Email must be 100 characters or fewer.')
      .email('Enter a valid email address.'),
  );

const serviceSchema = z
  .string()
  .refine((value) => serviceNames.includes(value), 'Please select one of the listed services.');

const descriptionSchema = z
  .string()
  .transform(sanitizeDescription)
  .pipe(
    z
      .string()
      .min(5, 'Please share at least 5 characters so we can understand your needs.')
      .max(500, 'Please keep your description under 500 characters.'),
  );

export const enquirySchema = z.object({
  fullName: nameSchema,
  mobile: mobileSchema.transform(normalizeIndianMobile),
  email: emailSchema,
  service: serviceSchema,
  message: descriptionSchema,
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'Please agree to the Privacy Policy and Terms and Conditions to proceed.',
    }),
  }),
});
