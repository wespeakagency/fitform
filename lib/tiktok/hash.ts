import { createHash } from 'node:crypto';

export function sha256Lowercase(value: string): string {
  return createHash('sha256')
    .update(value.trim().toLowerCase())
    .digest('hex');
}
