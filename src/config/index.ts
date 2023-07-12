export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const dbUri = IS_PRODUCTION ? process.env.PRODUCTION_DB_URI : process.env.LOCAL_DB_URI;
if (!dbUri) throw Error('DB URI is undefined!');
export const DB_URI = dbUri;
