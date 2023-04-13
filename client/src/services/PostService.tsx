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
  updatePost = (id: string, post: any) => {
    return this.put(`/posts/${id}`, post);
  }
  deletePost = ({id}:any) => {
    return this.delete(`/posts/${id}`);
  }
  likePost = (id: string) => {
    return this.post(`/posts/${id}/like`, "");
  }
  sharePost = (id: string) => {
    return this.post(`/posts/${id}/share`, "");
  }
}

export const postService = new PostService();
