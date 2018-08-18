const classify = require('./classify-commits');

describe('classify commits', () => {

    it('should group features and fixes', () => {
        // given
        const commitMessages = [
            'feat(toto): blabla', 
            'feat(toto): blibli', 
            'feat(foo): something useful', 
            'fix(toto): remove nasty bug', 
            'fix(toto): remove another nasty bug', 
            'feat: some transversal stuff', 
        ];
        // when
        const classifiedMessages = classify(commitMessages);
        // then
        expect(Object.keys(classifiedMessages)).toHaveLength(2);
        expect(Object.keys(classifiedMessages.feat)).toEqual(['toto', 'foo', 'common']);
        expect(classifiedMessages.feat.toto).toHaveLength(2);
        expect(classifiedMessages.feat.toto).toEqual(['blabla', 'blibli']); 
        expect(classifiedMessages.fix.toto).toHaveLength(2);
    });
});