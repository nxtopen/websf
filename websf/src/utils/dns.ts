import * as dns from 'dns';

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

export { getAllDnsRecords };