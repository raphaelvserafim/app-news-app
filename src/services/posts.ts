import { formatPosts } from "@/utils/formatter";
import { Wpp } from "@/services/wpp";

export async function getRecentPosts(qtd: number = 5) {
  try {
    const posts = await Wpp.fetchRecentPosts(qtd);
    return await formatPosts(posts, Wpp.fetchFeaturedImageUrl);
  } catch (error) {
    console.error('Erro ao formatar notícias recentes:', error);
    throw error;
  }
}