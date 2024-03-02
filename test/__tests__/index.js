const { getAllDnsRecords, scanSubdomains, mozillaObservatory } = require('websf');

describe('WebSF - JavaScript Test', () => {
    test('getAllDnsRecords', async () => {
        const records = await getAllDnsRecords('google.com');
        expect(records).toBeDefined();
    });

    test('scanSubdomains', async () => {
        const subdomains = await scanSubdomains('google.com');
        expect(subdomains).toBeDefined();
    });

    test('mozillaObservatory', async () => {
        const response = await mozillaObservatory('google.com');
        expect(response).toBeDefined();
    });
});