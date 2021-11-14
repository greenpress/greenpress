export interface IBlock {
  _id: string;
  tenant: string
  name: string
  description: string
  path: string
  content: string
  contentType: 'html' | 'content'
  created: Date
}
