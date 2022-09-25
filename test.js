const fetchEconomicPravdaContent = require("./contentFetchers/fetchEconomicPravdaContent");
const createEconomicPravdaPost = require("./postCreators/createEconomicPravdaPost");

(async () => {
  const targetUrl = "https://www.epravda.com.ua/";
  const content = await fetchEconomicPravdaContent(targetUrl);
  console.log(await createEconomicPravdaPost(targetUrl, content));
})();
