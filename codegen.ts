import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:4123/graphql',
	// documents: ['src/lib/graphql/*.tsx'],
	generates: {
		'./src/lib/graphql/generated/': {
			preset: 'client'
		}
	}
};
export default config;
