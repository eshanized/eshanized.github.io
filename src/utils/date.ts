import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM dd, yyyy');
}

export function formatRelativeDate(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}