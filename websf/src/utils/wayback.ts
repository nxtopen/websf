import axios from 'axios';

async function getWaybackSnapshots(domain) {
    try {
        const apiUrl = `https://archive.org/wayback/available?url=${domain}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching Wayback Machine snapshots:', error);
        return null;
    }
}

export { getWaybackSnapshots };