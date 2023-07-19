import cls from './popup.module.scss';

export const optionsClasses = (direction: string) => [cls[direction.replace(/ /g, '-')]];
