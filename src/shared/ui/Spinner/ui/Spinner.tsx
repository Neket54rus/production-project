import { FC } from 'react';

import './Spinner.scss';

export const Spinner: FC = () => {
	return (
		<div className="lds-spinner">
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
	);
};
