import axios from "axios";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql/";

export const getLeetcodeStats = async (username) => {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const response = await axios.post(
    LEETCODE_GRAPHQL_URL,
    {
      query,
      variables: {
        username,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "CodeMatch/1.0",
      },
      timeout: 10000,
    }
  );

  const matchedUser = response.data?.data?.matchedUser;

  if (!matchedUser) {
    return null;
  }

  const submissions =
    matchedUser.submitStats?.acSubmissionNum || [];

  const getCount = (difficulty) =>
    submissions.find(
      (item) => item.difficulty === difficulty
    )?.count ?? 0;

  return {
    username: matchedUser.username,
    name: matchedUser.profile?.realName || "",
    totalSolved: getCount("All"),
    easy: getCount("Easy"),
    medium: getCount("Medium"),
    hard: getCount("Hard"),
  };
};