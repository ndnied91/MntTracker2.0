import Mnt from '../models/MountainModel.js';

export const getAllJobs = async (req, res) => {
  const mountains = await Mnt.find({});
  res.status(200).send({ mountains });
};
