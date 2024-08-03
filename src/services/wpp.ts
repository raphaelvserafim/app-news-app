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

  static async fetchRecentPosts(page: number = 1, perPage: number = 10): Promise<any[]> {
    try {
      const response = await api.get('/posts', {
        params: {
          per_page: perPage,
          page: page,
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


  static async fetchPostsByCategory(categoryId: number, perPage: number = 10): Promise<any[]> {
    try {
      const response = await api.get('/posts', {
        params: {
          categories: categoryId,
          per_page: perPage,
          orderby: 'date',
          order: 'desc',
          _embed: true,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter posts por categoria:', error);
      throw error;
    }
  }


  static async fetchAuthors(perPage: number = 100): Promise<any[]> {
    try {
      const response = await api.get('/users', {
        params: {
          per_page: perPage,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter autores:', error);
      throw error;
    }
  }


  static async fetchTags(perPage: number = 100): Promise<any[]> {
    try {
      const response = await api.get('/tags', {
        params: {
          per_page: perPage,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter tags:', error);
      throw error;
    }
  }

  static async fetchComments(postId: number, perPage: number = 50): Promise<any[]> {
    try {
      const response = await api.get('/comments', {
        params: {
          post: postId,
          per_page: perPage,
          order: 'asc',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter comentários:', error);
      throw error;
    }
  }

}
