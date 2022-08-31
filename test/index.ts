import testApi from './api';
import testCommon from './common';
import testIntegration from './integration';
import testWeb from './web';

const tests: ReadonlyArray<readonly [() => void, 'only'?]> = [
    [testApi],
    [testCommon],
    [testWeb],
    [testIntegration],
];

const selectedTests = tests.filter(([_, only]) => only);

if (process.env.IS_CI && selectedTests.length) {
    throw new Error('cannot have "only" in ci cd');
}

(!selectedTests.length ? tests : selectedTests).forEach(([test]) => test());
