import https from 'https';

async function certShSubdomains(domain) {
    return new Promise((resolve, reject) => {
        const url = `https://crt.sh/?q=${domain}&output=json`;
        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const jsonArray = JSON.parse(data);
                    const commonNames = [...new Set(jsonArray.map(entry => entry.common_name))];
                    resolve(commonNames);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function avSubdomains(domain) {
    return new Promise((resolve, reject) => {
        const url = `https://otx.alienvault.com/api/v1/indicators/domain/${domain}/passive_dns`;
        const options = {};
        https.get(url, options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    const jsonArray = JSON.parse(data);
                    const hostnames = [...new Set(jsonArray['passive_dns'].map(entry => entry.hostname))];
                    resolve(hostnames);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function scanSubdomains(domain) {
    try {
        const [certShResult, avResult] = await Promise.all([
            certShSubdomains(domain),
            avSubdomains(domain)
        ]);

        let combinedResult = [];

        if (certShResult.length > 0 && avResult.length > 0) {
            // Combine and deduplicate results
            combinedResult = [...new Set([...certShResult, ...avResult])];
        } else if (certShResult.length > 0) {
            combinedResult = certShResult;
        } else if (avResult.length > 0) {
            combinedResult = avResult;
        }

        // Validate each subdomain and filter out invalid ones
        const validSubdomains = combinedResult.filter(sub => new RegExp(`^[^.]+.${domain}$`).test(sub));

        return { 'count': validSubdomains.length, 'subdomains': validSubdomains };
    } catch (error) {
        console.error("Error in scanSubdomains:", error);
        return { 'count': 0, 'subdomains': [] }; // Return empty response
    }
}

export { scanSubdomains };