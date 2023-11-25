import { endpoints } from '../scrappers/data.js';
import { scrapeVail } from '../scrappers/index.js';

export const updateMountains = async (req, res) => {
  endpoints.forEach((item, i) => {
    setTimeout(() => {
      scrapeVail(item);
    }, i * 2000);
  });

  res.status(200).json({ msg: 'updated' });
};
