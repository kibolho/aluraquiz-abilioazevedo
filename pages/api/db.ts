import { filterMyQuiz,fetchQuizes } from "../../src/utils/apiContentful";

export default async function dbHandler(request, response) {
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }
  const quizes = await fetchQuizes();
  const quiz = await filterMyQuiz(quizes);

  const db = quiz?.rawQuiz
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  response.json(db);
}
