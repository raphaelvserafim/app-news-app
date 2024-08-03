import { formatPosts } from "@/utils/formatter";
import { Wpp } from "@/services/wpp";
import { getCache, setCache } from "@/services/cacheManager";

export async function getRecentPosts(page: number = 1, qtd: number = 5,) {
  try {
    const cache = await getCache(getRecentPosts.name + page);
    if (cache) {
      return cache;
    }
    const posts = await Wpp.fetchRecentPosts(page, qtd);
    let formattedPosts = await formatPosts(posts, Wpp.fetchFeaturedImageUrl);
    setCache(getRecentPosts.name + page, formattedPosts);
    return formattedPosts;
  } catch (error) {
    console.error('Erro ao formatar notícias recentes:', error);
    throw error;
  }
}

export async function getPostsByCategory(categoryId: number, page: number = 1, qtd: number = 5) {
  try {
    const cache = await getCache(getPostsByCategory.name + page);
    if (cache) {
      return cache;
    }
    const posts = await Wpp.fetchPostsByCategory(categoryId, page, qtd);
    let formattedPosts = await formatPosts(posts, Wpp.fetchFeaturedImageUrl);
    setCache(getPostsByCategory.name + page, formattedPosts);
    return formattedPosts;
  } catch (error) {
    console.error('Erro ao formatar notícias recentes:', error);
    throw error;
  }
}