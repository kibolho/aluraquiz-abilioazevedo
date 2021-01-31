const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const myQuiz = "6olZW8JSHnZUConzT144BJ";

export async function fetchQuizes() {
  const entries = await client.getEntries();
  let items = [];
  if (entries.items) items = entries.items;
  const quizes = items
    .filter((item) => item.fields.rawQuiz)
    .map((item) => {
      return {
        id: item.sys.id,
        rawQuiz: item.fields.rawQuiz,
        title: item.fields.title,
      };
    });
  return quizes;
}


export function fetchQuiz(quizes, quizId) {
  const filteredQuizes = quizes.filter((item) => item.id === quizId)
  if(filteredQuizes.length>0)
    return filteredQuizes[0];
  return null;
}

export function filterMyQuiz(quizes){
  return fetchQuiz(quizes, myQuiz)
}
export function getExternalQuizes(quiz){
  return quiz?.rawQuiz?.external?.map((item) => {
    const [projectName, githubUser] = item
      .replace(/\//g, "")
      .replace("https:", "")
      .replace(".vercel.app", "")
      .split(".");

    return {
      id: encodeURIComponent(item),
      rawQuiz: null,
      title: `${githubUser}/${projectName}`,
    };
  });
}

export default {fetchQuizes,fetchQuiz,filterMyQuiz,getExternalQuizes}