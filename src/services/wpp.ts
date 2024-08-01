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

  static async fetchRecentPosts(perPage: number = 10): Promise<any[]> {
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

  static async fetchFeaturedImageUrl(imageId: number): Promise<string> {
    try {
      const response = await api.get(`/media/${imageId}`);
      return response.data?.source_url || '';
    } catch (error) {
      console.error('Erro ao obter imagem destacada:', error);
      return '';
    }
  }

  static async formatPosts(posts: any[]): Promise<{ id: number; title: string; date: string; excerpt: string; link: string; imageUrl: string }[]> {
    const formattedPosts = posts.map(async (post: {
      id: number;
      title: { rendered: string };
      date: string;
      excerpt: { rendered: string };
      link: string;
      featured_media?: number;
    }) => {
      const featuredImageId = post.featured_media;
      const featuredImage = featuredImageId ? await this.fetchFeaturedImageUrl(featuredImageId) : '';
      return {
        id: post.id,
        title: post.title.rendered,
        date: post.date,
        excerpt: post.excerpt.rendered,
        link: post.link,
        imageUrl: featuredImage,
      };
    });

    return Promise.all(formattedPosts);
  }

  static async getFormattedRecentPosts() {
    try {
      const posts = await this.fetchRecentPosts();
      return await this.formatPosts(posts);
    } catch (error) {
      console.error('Erro ao formatar notícias recentes:', error);
      throw error;
    }
  }

  
}
