import mongoose from 'mongoose';
const MountainSchema = new mongoose.Schema(
  {
    name: String,
    formattedName: String,
    liftsOpen: String,
    trailsOpen: String,
    terrain: String,
    report: String,
    forecast: Array,
  },
  { timestamps: true }
);

export default mongoose.model('Mnt', MountainSchema);
