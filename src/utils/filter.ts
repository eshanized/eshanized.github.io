import { Repository, Article } from '../types';

export function filterRepositories(
  repositories: Repository[],
  search: string,
  language?: string
): Repository[] {
  return repositories.filter((repo) => {
    const matchesSearch = search
      ? repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
      : true;
    
    const matchesLanguage = language ? repo.language === language : true;

    return matchesSearch && matchesLanguage;
  });
}

export function filterArticles(
  articles: Article[],
  search: string,
  tag?: string
): Article[] {
  return articles.filter((article) => {
    const matchesSearch = search
      ? article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.description.toLowerCase().includes(search.toLowerCase())
      : true;
    
    const matchesTag = tag ? article.tags.includes(tag) : true;

    return matchesSearch && matchesTag;
  });
}