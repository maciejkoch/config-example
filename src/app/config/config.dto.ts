import { z } from 'zod';

const schema = z.object({
  apiUrl: z.string(),
  theme: z.string(),
  language: z.string(),
  showAds: z.boolean(),
  features: z.object({
    enableChat: z.boolean(),
    enablePayments: z.boolean(),
    enableNotifications: z.boolean(),
  }),
  branding: z.object({
    companyName: z.string(),
    supportEmail: z.string(),
  }),
});

export type ConfigDTO = z.infer<typeof schema>;

export function parseDTO(source: unknown) {
  return schema.safeParse(source);
}
