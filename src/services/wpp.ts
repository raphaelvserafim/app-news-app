import api from "@/services/api";

export class Wpp {

  static async fetchCategories(perPage: number = 100): Promise<any[]> {
    try {
      let allCategories: any[] = [];
      let page = 1;
      let categories;
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

  static async fetchFeaturedImageUrl(imageId: number): Promise<string> {
    try {
      const response = await api.get(`/media/${imageId}`);
      return response.data?.source_url || '';
    } catch (error) {
      console.error('Erro ao obter imagem destacada:', error);
      return '';
    }
  }

  static async fetchRecentPosts(perPage: number): Promise<any[]> {
    try {
      const response = await api.get('/posts', {
        params: {
          per_page: perPage,
          orderby: 'date',
          order: 'desc',
          _embed: true,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter notícias recentes:', error);
      throw error;
    }
  }


}
