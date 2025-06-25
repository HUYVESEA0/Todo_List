import { Priority } from '../types';

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'LOW':
      return '#4caf50'; // Green
    case 'MEDIUM':
      return '#ff9800'; // Orange
    case 'HIGH':
      return '#f44336'; // Red
    case 'URGENT':
      return '#9c27b0'; // Purple
    default:
      return '#757575'; // Grey
  }
};

export const getPriorityLabel = (priority: Priority): string => {
  switch (priority) {
    case 'LOW':
      return 'Low';
    case 'MEDIUM':
      return 'Medium';
    case 'HIGH':
      return 'High';
    case 'URGENT':
      return 'Urgent';
    default:
      return 'Unknown';
  }
};

export const getPriorityOrder = (priority: Priority): number => {
  switch (priority) {
    case 'LOW':
      return 1;
    case 'MEDIUM':
      return 2;
    case 'HIGH':
      return 3;
    case 'URGENT':
      return 4;
    default:
      return 0;
  }
};

export const sortByPriority = <T extends { priority: Priority }>(items: T[]): T[] => {
  return items.sort((a, b) => getPriorityOrder(b.priority) - getPriorityOrder(a.priority));
};
