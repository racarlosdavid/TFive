const configs = require('../config/config');
const memory = require('../content/memory');
const request = require('supertest');
const server = require('../server');

describe(' test secrets memory ',()=>{

    it('tests create secret', async() => {
        const expected = memory.create('Secreto con jest',3);
        expect(expected.error).toBe(null)
        expect(expected.msj).toBe(`${configs.host.hostname}/secret/hash/${expected.hash}`)
    });

    it('tests get the ui', () => {
        const expected = memory.create('El secreto es que no hay secreto',5);
        const ui = memory.get(expected.hash)
        expect(expected.error).toBe(null)
        expect(ui).toContain('Show me the secret')
    });

    it('tests if memory has 2 records', () => {
        expect(memory.getAll().error).toBe(null)
        expect(memory.getAll().msj.length).toBe(2)
    });

    it('tests if the original link can be retrieved', () => {
        const expected = memory.create('La clave ultra secreta es @lphaRomeo92Ultr@',5);
        expect(expected.error).toBe(null)
        expect(memory.getAllLinks().error).toBe(null)
        expect(memory.getAllLinks().msj.length).toBe(3)
        expect(memory.has(expected.hash)).toBeTruthy();
        expect(memory.getAllLinks().msj.includes(`${configs.host.hostname}/secret/hash/${expected.hash}`)).toBeTruthy();
    });

    it('tests message for expired secret', async() => {
        const expected = memory.create('Secret for test if expire alter 3 calls',3);
        await request(server).get(`/secret/hash/${expected.hash}`);
        await request(server).get(`/secret/hash/${expected.hash}`);
        await request(server).get(`/secret/hash/${expected.hash}`);
        const ui = memory.get(expected.hash)
        expect(expected.error).toBe(null)
        expect(ui).toContain('SecretNotFound.png')
    });
    
})