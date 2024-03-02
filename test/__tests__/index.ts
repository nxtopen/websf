import { getAllDnsRecords, scanSubdomains, mozillaObservatory } from 'websf';

describe('WebSF - Typescript Test', () => {
    test('getAllDnsRecords', async () => {
        const records = await getAllDnsRecords('google.com');
        expect(records).toBeDefined();
    });
    test('mozillaObservatory', async () => {
        const response = await mozillaObservatory('google.com');
        expect(response).toBeDefined();
    });
});