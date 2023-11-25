// import 'express-async-errors';
// import Job from '../models/JobModel.js'; //job model
// import { StatusCodes } from 'http-status-codes';

import Mnt from '../models/MountainModel.js';

// import mongoose from 'mongoose';
// import day from 'dayjs';

// const mountains = [
//   { name: 'Mountain Creek', trailsOpen: '64', liftsOpen: '5' },
//   { name: 'Park City', trailsOpen: '34', liftsOpen: '3' },
//   { name: 'Okemo', trailsOpen: '44', liftsOpen: '2' },
//   { name: 'Blue Mountain', trailsOpen: '14', liftsOpen: '12' },
//   { name: 'Breck', trailsOpen: '54', liftsOpen: '9' },
//   { name: 'Keystone', trailsOpen: '74', liftsOpen: '7' },
//   { name: 'Whistler', trailsOpen: '13', liftsOpen: '5' },
// ];

export const getAllJobs = async (req, res) => {
  const mountains = await Mnt.find({});
  res.status(200).send({ mountains });
};
