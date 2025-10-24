import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BapCCQmu.js","_app/immutable/chunks/CFpU1HxI.js","_app/immutable/chunks/Cv51XehL.js","_app/immutable/chunks/DDgrLWr3.js","_app/immutable/chunks/DHe2nM5g.js","_app/immutable/chunks/Bc7GaiE5.js","_app/immutable/chunks/D1lqI1do.js"];
export const stylesheets = ["_app/immutable/assets/2.C1eup47s.css"];
export const fonts = [];
