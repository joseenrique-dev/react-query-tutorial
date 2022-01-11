export async function getGitHubData() {
  const response = await fetch(
    'https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=1'
  );
  return response.json();
}
