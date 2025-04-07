export type Plc = {
	runtime: {
		sources: {
			id: string;
			host: string;
			enabled: boolean;
		}[];
		variables: {
			id: string;
			value: string;
			source: {
				id: string;
				error: {
					message: string;
				};
				format: string;
			};
		}[];
	};
};
