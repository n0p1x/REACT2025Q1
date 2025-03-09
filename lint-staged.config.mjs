/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
	'src/**/*.ts?(x)': [
    'eslint --fix',
    'prettier --write',
	],
};
