const axios = require("axios");
const { merge } = require("lodash");
const url = require("url");
const contentFetchers = require("./contentFetchers");
const postCreators = require("./postCreators");

const signIn = async (usernameOrEmail, password) => {
  const url = `${process.env.LEMMY_API_URL}/user/login`;

  return (
    await axios.post(url, { username_or_email: usernameOrEmail, password })
  ).data;
};

// function: for creating post in Lemmy
const createLemmyPost = async (data, communityId, authToken) => {
  const _data = merge(
    {
      community_id: communityId,
      nsfw: false,
      name: "...",
      body: "",
    },
    data
  );

  console.log(_data);

  const url = `${process.env.LEMMY_API_URL}/post`;

  return await axios.post(url, { ..._data, auth: authToken });
};

// function: start point
const main = async () => {
  const targetUrl = process.env.TARGET_URL;
  const communityId = parseInt(process.env.COMMUNITY_ID, 10);
  const usernameOrEmail = process.env.USERNAME_OR_EMAIL;
  const password = process.env.PASSWORD;

  if (
    !process.env.LEMMY_API_URL ||
    !process.env.TARGET_URL ||
    !communityId ||
    !usernameOrEmail ||
    !password
  ) {
    throw new Error(
      "Env variables LEMMY_API_URL, TARGET_URL, COMMUNITY_ID, USERNAME_OR_EMAIL, PASSWORD are required."
    );
  }

  console.log("[info]: Signing in...");
  const { jwt: authToken } = await signIn(usernameOrEmail, password);

  console.log("[info]: Choosing content fetcher and post creator...");
  const { hostname } = url.parse(targetUrl);
  const fetchContent = contentFetchers[hostname];
  const createPost = postCreators[hostname];

  if (!fetchContent || !createPost) {
    throw new Error("URL is not supported.");
  }

  console.log("[info]: Fetching content...");
  const content = await fetchContent(targetUrl);

  if (content.length === 0) {
    throw new Error("Content is absent.");
  }

  console.log("[info]: Creating post...");
  const post = await createPost(url, content);

  console.log("[info]: Push post to API...");
  const {
    data: {
      post_view: { post: postView },
    },
  } = await createLemmyPost(post, communityId, authToken);

  console.log("[info]: Done");
  console.log(
    `[info]: Post URL: https://ujournal.com.ua/new/post/?postId=${postView.id}`
  );
};

// run main
try {
  main();
} catch (error) {
  console.log(`[error]: Error happened`);
  console.log(`[error]`, error);
}
