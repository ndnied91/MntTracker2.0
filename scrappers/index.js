import axios from 'axios';
import * as cheerio from 'cheerio';
import Mnt from '../models/MountainModel.js';

import { getWeather } from '../utils/getWeather.js';

export const scrapeVail = (location) => {
  let url = '';
  const arr = ['mountsnow', 'huntermtn', 'okemo', 'libertymountainresort'];
  if (arr.includes(location)) {
    url = `https://www.${location}.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx`;
  } else {
    url = `https://www.${location}.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx`;
  }

  let obj = '';

  axios
    .get(url)
    .then(async ({ data }) => {
      const $ = cheerio.load(data);

      let mntData = $('.terrain_summary__tab_main__text')
        .children()
        .text()
        .toString()
        .replace(/\t/g, '')
        .replace(/\n/g, '')
        .replace(/ /g, '')
        .replace(/%/g, '');
      mntData = mntData.match(/[A-Z]+|[^a-z]+/gi);

      const toObject = (arr) => {
        let rv = {};
        for (let i = 0; i < arr.length; i = i + 2)
          rv[arr[i].toLowerCase()] = arr[i + 1];
        return rv;
      };

      let obj = toObject(mntData.reverse());
      let mntName = $('.main_nav__resort_logo_text');

      return (obj = {
        name: location,
        formattedName: mntName
          .html()
          .replace(/homepage/g, '')
          .trim(),
        liftsOpen: obj['liftsopen'],
        trailsOpen: obj['trailsopen'],
        terrain: obj['terrainopen'],
        report: `https://www.${location}.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx`,
        forecast: await getWeather(location),
      });
    })
    //save to db
    .then(async (item) => {
      const filter = { name: item.name };
      const opts = { new: true, upsert: true };
      await Mnt.findOneAndUpdate(filter, item, opts);
      console.log('updated', item.name);
    });
};
