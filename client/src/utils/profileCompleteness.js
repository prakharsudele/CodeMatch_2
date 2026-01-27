export const getProfileCompleteness = (user) => {
  if (!user) return { percent: 0, missing: [] };

  let score = 0;
  const missing = [];

  if (user.github) {
    score += 30;
  } else {
    missing.push("Connect GitHub");
  }

  if (user.leetcode) {
    score += 30;
  } else {
    missing.push("Connect LeetCode");
  }

  if (user.avatar) {
    score += 20;
  } else {
    missing.push("Upload avatar");
  }

  if (user.username) {
    score += 10;
  } else {
    missing.push("Set username");
  }

  return {
    percent: score,
    missing,
  };
};
