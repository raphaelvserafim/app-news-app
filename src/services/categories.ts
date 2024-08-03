import { formatCategories } from "@/utils/formatter";
import { Wpp } from "@/services/wpp";

export async function allCategories() {
  try {
    const categories = await Wpp.fetchCategories();
    const formattedCategories = formatCategories(categories);
    return formattedCategories.sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Erro ao formatar categorias:', error);
    throw error;
  }
}
