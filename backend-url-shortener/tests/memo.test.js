const configs = require('../config/config');
const memory = require('../content/memory');

describe(' test memory ',()=>{

    it('tests create short url', async() => {
        const expected = memory.create('https://drive.google.com/file/d/1nLdE6EPwQN7hP8YpkxK6A5GPkv832G7D/view?usp=sharing');
        expect(expected.error).toBe(null)
        expect(expected.msj.shortener_url).toBe(`${configs.host.hostname}/redirect/hash/${expected.msj.hash}`)
    });

    it('tests if hash exist on the records', () => {
        const expected = memory.create('https://github.com/racarlosdavid/TFive/blob/main/Img/Architecture.png');
        expect(memory.has(expected.msj.hash)).toBe(true)
    });

    it('tests if memory has 2 records', () => {
        expect(memory.getAll().error).toBe(null)
        expect(memory.getAll().msj.length).toBe(2)
    });

    it('tests if the original link can be retrieved', () => {
        const originalURL = 'https://www.youtube.com/watch?v=L2qDaJcSH_o'
        const expected = memory.create(originalURL);
        expect(memory.has(expected.msj.hash)).toBe(true)
        expect(memory.getAll().error).toBe(null)
        expect(memory.getAll().msj.length).toBe(3)
        expect(memory.getUpdateRedirect(expected.msj.hash)).toBe(originalURL)
    });
    
})