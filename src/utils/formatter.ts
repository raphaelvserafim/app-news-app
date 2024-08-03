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

export async function formatPosts(posts: any[], fetchFeaturedImageUrl: (imageId: number) => Promise<string>): Promise<{ id: number; title: string; date: string; description: string; link: string; imageUrl: string }[]> {
  const formattedPosts = posts.map(async (post: {
    id: number;
    title: { rendered: string };
    date: string;
    excerpt: { rendered: string };
    link: string;
    featured_media?: number;
  }) => {
    const featuredImageId = post.featured_media;
    const featuredImage = featuredImageId ? await fetchFeaturedImageUrl(featuredImageId) : '';
    return {
      id: post.id,
      title: removeHtmlTags(truncateText(post.title.rendered, 60)),
      date: post.date,
      description: removeHtmlTags(truncateText(post.excerpt.rendered, 70)),
      link: post.link,
      imageUrl: featuredImage,
    };
  });

  return Promise.all(formattedPosts);
}
