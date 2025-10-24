import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BC8FoHR5.js","_app/immutable/chunks/CFpU1HxI.js","_app/immutable/chunks/Cv51XehL.js","_app/immutable/chunks/DHe2nM5g.js","_app/immutable/chunks/Bc7GaiE5.js","_app/immutable/chunks/DDgrLWr3.js","_app/immutable/chunks/D1lqI1do.js","_app/immutable/chunks/DEeOg8-L.js"];
export const stylesheets = ["_app/immutable/assets/0.Cf8OPvXi.css"];
export const fonts = ["_app/immutable/assets/space-grotesk-vietnamese-400-normal.B7xT_GF5.woff2","_app/immutable/assets/space-grotesk-vietnamese-400-normal.BIWiOVfw.woff","_app/immutable/assets/space-grotesk-latin-ext-400-normal.CfP_5XZW.woff2","_app/immutable/assets/space-grotesk-latin-ext-400-normal.DRPE3kg4.woff","_app/immutable/assets/space-grotesk-latin-400-normal.C_H9aji2.woff2","_app/immutable/assets/space-grotesk-latin-400-normal.BXeG7fug.woff","_app/immutable/assets/righteous-latin-ext-400-normal.rbdiPHGJ.woff2","_app/immutable/assets/righteous-latin-ext-400-normal.EtPo6WgU.woff","_app/immutable/assets/righteous-latin-400-normal.DIzXvQUm.woff2","_app/immutable/assets/righteous-latin-400-normal.CRvo487o.woff"];
