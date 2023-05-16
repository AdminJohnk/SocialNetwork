import CommentDetail from '../../Comment/CommentDetail';
import Post from '../../Post/Post';
import { useState, useEffect } from 'react';
import PostShare from '../../Post/PostShare';
import StyleTotal from './cssPostDetail';

interface PostProps {
  post: any;
  userInfo: any;
  data: any;
  onData: (data: any) => void;
  postShare?: any;
  owner?: any;
}

const PostDetail = (Props: PostProps) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(Props.data.idComment);

  useEffect(() => {
    setSelectedCommentId(Props.data.idComment);
  }, [Props.data]);

  const handleSelectComment = (commentId: string | null) => {
    setSelectedCommentId(commentId);
  };

  return (
    <StyleTotal>
      <div
        className="postDetail"
        style={{
          height: '78vh',  
          overflow: 'auto', 
        }}
      >
        {Props.postShare ? (
          <PostShare key={Props.post?._id} post={Props.post} userInfo={Props.userInfo} owner={Props.owner} />
        ) : (
          <Post key={Props.post?._id} post={Props.post} userInfo={Props.userInfo} />
        )}
        <div className="commentTotal">
          {Props.post?.comments?.map((item: any, index: number) => {
            return (
              <div key={index}>
                {item ? (
                  <CommentDetail
                    onData={Props.onData}
                    comment={item}
                    userInfo={Props.userInfo}
                    selectedCommentId={selectedCommentId}
                    onSelectComment={handleSelectComment}
                  >
                    {item.listReply?.map((item: any, index: number) => {
                      return (
                        <CommentDetail
                          onData={Props.onData}
                          comment={item}
                          userInfo={Props.userInfo}
                          selectedCommentId={selectedCommentId}
                          onSelectComment={handleSelectComment}
                          isReply={true}
                        />
                      );
                    })}
                  </CommentDetail>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </StyleTotal>
  );
};

export default PostDetail;
