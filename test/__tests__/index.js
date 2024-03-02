const { getAllDnsRecords, scanSubdomains, mozillaObservatory } = require('websf');

describe('WebSF - JavaScript Test', () => {
    test('Check if function is working', async () => {
        const records = await getAllDnsRecords('google.com');
        expect(records).toBeDefined();
    });
});