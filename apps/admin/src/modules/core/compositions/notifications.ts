import { ElNotification } from 'element-plus';

export function useNotifications() {
  return {
    success: msg => ElNotification.success(msg),
    error: msg => ElNotification.error(msg),
  }
}
