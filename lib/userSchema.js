import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profileId: { type: String },
    walletAddress: { type: String },
    bio: { type: String, default: "I'm a learner." },
  },
  { timestamps: true }
);

let Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;
