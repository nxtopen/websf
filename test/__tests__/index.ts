import { getAllDnsRecords, scanSubdomains, mozillaObservatory } from 'websf';

describe('WebSF - Typescript Test', () => {
    test('Check if function is working', async () => {
        const records = await getAllDnsRecords('google.com');
        expect(records).toBeDefined();
    });
});