import { BaseService } from "./BaseService";

export class PostService extends BaseService {
  constructor() {
    super();
  }

  getAllPostByUserID = (id: String | null) => {
    return this.get(`/${id}/posts`);
  };
  createPost = (post: any, img: any) => {
    return this.post(`/posts`, post);
  };
  deletePost = ({id}:any) => {
    return this.delete(`/posts/${id}`);
  }
}

export const postService = new PostService();
