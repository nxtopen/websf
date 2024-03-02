import axios from 'axios';

async function mozillaObservatory(domain) {
    try {
        const analyzeUrl = `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${domain}`;
        const analyzeResponse = await axios.post(analyzeUrl);

        if (!analyzeResponse.data.scan_id) {
            return analyzeResponse.data;
        }

        const scanId = analyzeResponse.data.scan_id;

        const scanResultsUrl = `https://http-observatory.security.mozilla.org/api/v1/getScanResults?scan=${scanId}`;
        const scanResultsResponse = await axios.get(scanResultsUrl);

        return scanResultsResponse.data;
    } catch (error) {
        console.error('Error analyzing domain with Mozilla Observatory:', error);
        return null;
    }
}

export { mozillaObservatory };