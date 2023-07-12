export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const dbUri = IS_PRODUCTION ? process.env.PRODUCTION_DB_URI : process.env.LOCAL_DB_URI;
if (!dbUri) throw Error('DB URI is undefined!');
export const DB_URI = dbUri;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw Error('Google credentials not found');
}
export const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
