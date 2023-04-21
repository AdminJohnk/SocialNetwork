import CommentDetail from "../../Comment/CommentDetail";
import Post from "../../Post/Post";

interface PostProps {
  post: any;
  userInfo: any;
}

const PostDetail = (Props: PostProps) => {
  return (
    <div>
      <Post post={Props.post} userInfo={Props.userInfo} />
      {Props.post.comments.map((item: any, index: number) => {
        return (
          <div>
            {item ? (
              <CommentDetail
                key={index}
                comment={item}
                userInfo={Props.userInfo}
              >
                {item.listReply.map((item: any, index: number) => {
                  return (
                    <CommentDetail
                      key={index}
                      comment={item}
                      userInfo={Props.userInfo}
                    />
                  );
                })}
              </CommentDetail>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default PostDetail;
