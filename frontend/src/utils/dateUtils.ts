import { format, parseISO, isToday, isTomorrow, isYesterday, isPast, isFuture } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'PP'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'PPp');
};

export const formatTime = (date: string | Date): string => {
  return formatDate(date, 'p');
};

export const getRelativeDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return 'Today';
  } else if (isTomorrow(dateObj)) {
    return 'Tomorrow';
  } else if (isYesterday(dateObj)) {
    return 'Yesterday';
  } else {
    return formatDate(dateObj, 'MMM d, yyyy');
  }
};

export const isOverdue = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isPast(dateObj) && !isToday(dateObj);
};

export const isDueToday = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isToday(dateObj);
};

export const isDueTomorrow = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isTomorrow(dateObj);
};

export const isDueSoon = (date: string | Date, days: number = 3): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const soonDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return isFuture(dateObj) && dateObj <= soonDate;
};
