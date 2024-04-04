const MarkovMachine = require('./markov')

describe('Markov Class', ()=>{

    test('makeText should return a string', () =>{
        const testMachine = new MarkovMachine.MarkovMachine('a test message')
        testMachine.makeChains()
        const res = testMachine.makeText()

        expect(res).toEqual(expect.any(String))
    })
})
