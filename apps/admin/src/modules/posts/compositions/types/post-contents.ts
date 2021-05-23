export enum PostContentState {
  EDITOR = 'editor',
  HTML = 'html'
}
export interface PostContent {
  content: string;
  index: number;
  state: PostContentState
}

export type PostContents = Array<PostContent>;
