import { BaseService } from "./BaseService";

export class PostService extends BaseService {
  constructor() {
    super();
  }

  getAllPostByUserID = (id: String | null) => {
    return this.get(`/${id}/posts`);
  };
  createPost = (post: any) => {
    return this.post(`/posts`, post);
  };
}

export const postService = new PostService();
