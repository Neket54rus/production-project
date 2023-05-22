import { FC } from 'react';

import './Spinner.scss';

interface SpinnerProps {
    className?: string
}

export const Spinner: FC<SpinnerProps> = (props) => {
    const { className } = props;

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
