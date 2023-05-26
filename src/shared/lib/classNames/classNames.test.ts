import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
    test('with only first params', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with additional class', () => {
        const expected = 'someClass class1 class2';
        expect(classNames(
            'someClass',
            {},
            ['class1', 'class2'],
        )).toBe(expected);
    });

    test('with mods', () => {
        const expected = 'someClass class1 class2 hover';
        expect(classNames(
            'someClass',
            { hover: true, active: false, scrollable: undefined },
            ['class1', 'class2'],
        )).toBe(expected);
    });
});
