import testContact from './contact';

const testCommon = () =>
    describe('Common', () => {
        testContact();
    });

export default testCommon;
