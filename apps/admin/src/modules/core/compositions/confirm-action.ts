import { ElMessageBox } from 'element-plus'
import { MessageType } from 'element-plus/es/el-message-box/src/message-box.type'

export interface ConfirmationContent {
  text?: string,
  title?: string,
  type?: MessageType
}

/**
 *
 * @param {Function} action
 * @param text
 * @param title
 * @param type
 * @returns {function(...[*]=)}
 */
export function useConfirmAction(action, { text = 'Are you sure?', title = '', type = 'warning' }: ConfirmationContent = {}) {
  return (item) => {
		ElMessageBox.confirm(text, title, { type })
      .then(() => action(item))
      .catch(() => {
      })
  }
}
