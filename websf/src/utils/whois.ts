import axios from 'axios';

async function getDomainWhois(domain) {
    try {
        const apiUrl = `https://otx.alienvault.com/api/v1/indicators/domain/${domain}/whois`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching WHOIS information:', error);
        return null;
    }
}

export { getDomainWhois };