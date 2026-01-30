import User from "../../server/models/User.js";

export const notifyUser = async ({ toUserId, fromUserId, type }) => {
  await User.findByIdAndUpdate(toUserId, {
    $push: {
      notifications: {
        type,
        from: fromUserId,
      },
    },
  });
};
