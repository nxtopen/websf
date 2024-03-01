import axios from 'axios';

async function certShSubdomains(domain) {
    try {
        const url = `https://crt.sh/?q=${domain}&output=json`;
        const response = await axios.get(url);
        const jsonArray = response.data;
        const commonNames = [...new Set(jsonArray.map(entry => entry.common_name))];
        return commonNames;
    } catch (error) {
        throw error;
    }
}

async function avSubdomains(domain) {
    try {
        const url = `https://otx.alienvault.com/api/v1/indicators/domain/${domain}/passive_dns`;
        const response = await axios.get(url);
        const jsonArray = response.data;
        const hostnames = [...new Set(jsonArray['passive_dns'].map(entry => entry.hostname))];
        return hostnames;
    } catch (error) {
        throw error;
    }
}

async function scanSubdomains(domain) {
    try {
        const [certShResult, avResult] = await Promise.all([
            certShSubdomains(domain),
            avSubdomains(domain)
        ]);

        let combinedResult:any = [];

        if (certShResult.length > 0 && avResult.length > 0) {
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