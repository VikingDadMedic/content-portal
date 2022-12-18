import { writable } from 'svelte/store';

export const sessionStore = writable();


// import { writable, type Writable } from 'svelte/store';
// import type { Session } from '$src/models/session/session';

// export const sessionStore: Writable<Session | null> = writable();
