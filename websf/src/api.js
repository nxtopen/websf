import express from 'express';
import { getAllDnsRecords } from './utils/dns.js';
import { scanSubdomains } from './utils/subdomain.js';

const router = express.Router();

router.get('/scan-all/:domain', async (req, res) => {
    try {
        const { domain } = req.params;
        const dnsRecords = await getAllDnsRecords(domain);
        const subdomains = await scanSubdomains(domain);
        const combinedData = {
            dnsRecords,
            subdomains
        };
        res.status(200).json(combinedData);
    } catch (error) {
        console.error('Error in /scan-all endpoint:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

export default router;