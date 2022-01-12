export async function getGitHubData(page = 1) {
  debugger;
  const response = await fetch(
    `https://api.github.com/search/repositories?q=topic:reactjs&per_page=3&page=${page}`
  );
  return response.json();
}
