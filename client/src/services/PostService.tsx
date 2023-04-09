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
  likePost = (id: string) => {
    console.log("sdgseg");
    return this.post(`/posts/${id}/like`, "");
  }
}

export const postService = new PostService();
