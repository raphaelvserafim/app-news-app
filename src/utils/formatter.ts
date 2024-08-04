import { FormattedPost, Post } from "@/model";
import { setCache } from "@/services/cacheManager";
import { cleanCategoryName, removeHtmlTags, truncateText } from "@/utils";

export function formatCategories(categories: any[]): { id: number; name: string; slug: string; description: string; count: number }[] {
  return categories.map((category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
  }) => ({
    id: category.id,
    name: cleanCategoryName(category?.name),
    slug: category.slug,
    description: category.description,
    count: category.count,
  }));
}

export async function formatPosts(posts: Post[]): Promise<FormattedPost[]> {
  return posts.map(post => {
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const thumbnailUrl = featuredMedia?.media_details?.sizes?.thumbnail?.source_url || '';
    const fullImageUrl = featuredMedia?.media_details?.sizes?.full?.source_url || featuredMedia?.source_url || "";
    const _post = {
      id: post.id,
      title: removeHtmlTags(post.title.rendered),
      date: post.date,
      description: removeHtmlTags(post.excerpt.rendered),
      link: post.link,
      content: post.content.rendered,
      author: post.author,
      thumbnailUrl,
      fullImageUrl,
    };
    return _post;
  });
}

