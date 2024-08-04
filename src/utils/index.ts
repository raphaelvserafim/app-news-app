import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';



export function cleanCategoryName(name: string): string {
  name = name.replace(/^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g, '');
  name = name.replace(/^Z___|___$/g, '');
  return name;

}


export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}

export function removeHtmlTags(htmlString: string) {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, '');
}

export function dateTime(date: string | undefined) {
  return formatDistanceToNow(new Date(date || new Date()), {
    addSuffix: true,
    locale: ptBR,
  });
}

