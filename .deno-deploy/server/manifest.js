export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["logoModbus.png","favicon.png","logoRedis.png","network-server.png","tentacle.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.S2QDiHDy.js",app:"_app/immutable/entry/app.CTJ5a6iY.js",imports:["_app/immutable/entry/start.S2QDiHDy.js","_app/immutable/chunks/Bc7GaiE5.js","_app/immutable/chunks/Cv51XehL.js","_app/immutable/entry/app.CTJ5a6iY.js","_app/immutable/chunks/Cv51XehL.js","_app/immutable/chunks/CFpU1HxI.js","_app/immutable/chunks/DDgrLWr3.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/tentacle",
				pattern: /^\/api\/tentacle\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/tentacle/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
