export interface Post {
  postId: number;
  image: string;
  title: string;
  content: string;
  updatedAt: Date;
}

export interface Comment {
  commentId: number;
  content: string;
}

export interface editFormSubmitType {
  title: string;
  content: string;
}

export interface addFormSubmitType {
  image: string;
  title: string;
  content: string;
}
