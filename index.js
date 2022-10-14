const axios = require("axios");
const { merge } = require("lodash");
const url = require("url");
const contentFetchers = require("./contentFetchers");
const postCreators = require("./postCreators");

// function: for sign in by username/email and password
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

  if (!_data.url && !_data.name && !_data.body && !_data.community_id) {
    throw new Error(
      "Can't create post. Fields url, name, body, community_id are required."
    );
  }

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
  const _hostname = hostname.replace("www.", "");
  const fetchContent = contentFetchers[_hostname];
  const createPost = postCreators[_hostname];

  if (!fetchContent || !createPost) {
    throw new Error("URL is not supported.");
  }

  console.log(`[info]: Fetching content (${targetUrl})...`);
  const content = await fetchContent(targetUrl);

  console.log("[info]: Creating post(s)...");
  const post = await createPost(targetUrl, content);

  if (post) {
    console.log("[info]: Push post(s) to API...");
    const posts = post instanceof Array ? post : [post];

    for (let post of posts) {
      const {
        data: {
          post_view: { post: _post },
        },
      } = await createLemmyPost(post, communityId, authToken);

      console.log(
        `[info]: Post URL: https://ujournal.com.ua/new/post/?postId=${_post.id}`
      );
    }
  } else {
    console.log("[info]: Creator returns empty post. Post doesn't created.");
  }

  console.log("[info]: Done");
};

// run main
try {
  main();
} catch (error) {
  console.log(`[error]: Error happened`);
  console.log(`[error]`, error);
}
