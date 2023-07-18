import type webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { type BuildOptions } from './types/config';

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
	const { isDev } = options;

	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff2|woff)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const sassLoader = buildCssLoader(isDev);

	const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
	const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

	return [
		fileLoader,
		svgLoader,
		codeBabelLoader,
		tsxCodeBabelLoader,
		sassLoader,
	];
};
