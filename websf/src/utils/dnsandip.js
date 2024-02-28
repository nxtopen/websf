import dns from 'dns';
import https from 'https';

async function dnsLookup(website) {
    return new Promise((resolve, reject) => {
        dns.lookup(website, (err, address) => {
            if (err) {
                reject(err);
            } else {
                resolve(address);
            }
        });
    });
}

async function getAllDnsRecords(website) {
    return new Promise((resolve, reject) => {
        const records = {
            A: false,
            AAAA: false,
            CNAME: false,
            MX: false,
            TXT: false,
            PTR: false,
            SOA: false,
            SRV: false,
            NAPTR: false,
            CAA: false,
            NS: false,
            IP: false // Add IP placeholder
        };

        const tasks = Object.keys(records).map(recordType => {
            return new Promise((resolve, reject) => {
                if (recordType === 'IP') {
                    dns.lookup(website, (err, address, family) => {
                        if (err) {
                            resolve(false); // Unable to resolve IP
                        } else {
                            resolve(address); // Resolved IP
                        }
                    });
                } else {
                    dns.resolve(website, recordType, (err, data) => {
                        if (err) {
                            // Record not found
                            resolve(false);
                        } else {
                            // Record found
                            resolve(data);
                        }
                    });
                }
            });
        });

        Promise.all(tasks)
            .then(results => {
                Object.keys(records).forEach((recordType, index) => {
                    records[recordType] = results[index];
                });
                resolve(records);
            })
            .catch(err => {
                reject(err);
            });
    });
}

async function getIpAndReverseLookup(website) {
    try {
        const ipAddress = await dnsLookup(website);
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'api.hackertarget.com',
                path: `/reverseiplookup/?q=${ipAddress}`,
                method: 'GET'
            };

            const req = https.request(options, res => {
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    const domains = data.trim().split('\n');
                    const totalCount = domains.length;
                    const response = {
                        totalCount,
                        domains
                    };
                    resolve(response);
                });
            });

            req.on('error', error => {
                reject(error);
            });

            req.end();
        });
    } catch (error) {
        throw new Error('Error fetching reverse IP lookup data');
    }
}

export { dnsLookup, getIpAndReverseLookup, getAllDnsRecords };