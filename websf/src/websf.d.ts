declare module 'websf' {
    export function getAllDnsRecords(domain: string): Promise<any>;
    export function scanSubdomains(domain: string): Promise<any>;
}