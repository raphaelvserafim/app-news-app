import { formatCategories } from "@/utils/formatter";
import { Wpp } from "@/services/wpp";
import { getCache, setCache } from "@/services/cacheManager";

export async function allCategories() {
  try {
    const cache = await getCache(allCategories.name);
    if (cache) {
      return cache;
    }
    const categories = await Wpp.fetchCategories();
    let formattedCategories = formatCategories(categories);
    formattedCategories.sort((a, b) => b.count - a.count);
    setCache(allCategories.name, formattedCategories);
    return formattedCategories;
  } catch (error) {
    console.error('Erro ao formatar categorias:', error);
    throw error;
  }
}
