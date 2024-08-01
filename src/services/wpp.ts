import api from "./api";

export class Wpp {

  static async fetchCategories(perPage: number = 100): Promise<any[]> {
    let allCategories: any[] = [];
    let page = 1;
    let categories;

    try {
      do {
        categories = await api.get('/categories', {
          params: {
            per_page: perPage,
            page: page,
          }
        }).then(response => response.data);

        allCategories = allCategories.concat(categories);
        page++;
      } while (categories.length === perPage);

      return allCategories;
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      throw error;
    }
  }

  static formatCategories(categories: any[]): { id: number; name: string; slug: string; description: string; count: number }[] {
    return categories.map((category: {
      id: number;
      name: string;
      slug: string;
      description: string;
      count: number;
    }) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      count: category.count,
    }));
  }

  static async getFormattedCategories() {
    try {
      const categories = await this.fetchCategories();
      const formattedCategories = this.formatCategories(categories);
      return formattedCategories.sort((a, b) => b.count - a.count);
    } catch (error) {
      console.error('Erro ao formatar categorias:', error);
      throw error;
    }
  }
}