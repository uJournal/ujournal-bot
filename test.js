const fetchEconomicPravdaContent = require("./contentFetchers/fetchEconomicPravdaContent");
const createEconomicPravdaPost = require("./postCreators/createEconomicPravdaPost");
const fetchImdbContent = require("./contentFetchers/fetchImdbContent");
const createImdbPost = require("./postCreators/createImdbPost");

(async () => {
  // const targetUrl = "https://www.epravda.com.ua/";
  // const content = await fetchEconomicPravdaContent(targetUrl);
  // console.log(await createEconomicPravdaPost(targetUrl, content));
  const targetUrl = "https://www.imdb.com/calendar/";
  const content = await fetchImdbContent(targetUrl);
  // console.log(content);
  console.log(await createImdbPost(targetUrl, content));
})();
