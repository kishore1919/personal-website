import testApi from './api';
import testCommon from './common';
import testIntegration from './integration';
import testWeb from './web';
import testCases from 'cases-of-test';

testCases({
    tests: [[testApi], [testCommon], [testWeb], [testIntegration]],
});
