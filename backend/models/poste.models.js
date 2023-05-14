const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PosteSchema = new Schema(
  {
    title: { type: String, required: true },
    company_name: { type: String, required: true },
    company_logo: { type: String, required: false },
    company_email: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    work_schedule: { type: String, required: true },
    level_of_study: { type: String, required: true },
    contract_type: { type: String, required: true },
    experience: { type: String, required: true },
    language_requirement: { type: String, required: true },
    job_vacancy: { type: Number, required: true },
    genre: { type: String, required: true },
    candidates: [{ type: Schema.Types.ObjectId, ref: 'users' }],

    domaineId: {
      type: Schema.Types.ObjectId,
      ref: 'domaine',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('poste', PosteSchema);
