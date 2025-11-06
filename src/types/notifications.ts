export type NotificationType = 'alert' | 'advice' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string; // Add link for navigation
}
