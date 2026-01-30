passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneAndUpdate(
          { githubId: profile.id },
          {
            githubId: profile.id,
            username: profile.username,
            avatar: profile.photos?.[0]?.value,
            githubToken: accessToken, // 🔥 THIS IS THE KEY FIX
            github: {
              username: profile.username,
              profileUrl: profile.profileUrl,
              avatar: profile.photos?.[0]?.value,
            },
          },
          { upsert: true, new: true }
        );

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
