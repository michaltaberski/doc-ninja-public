import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://db.doc.ninja');
pb.autoCancellation(false);
