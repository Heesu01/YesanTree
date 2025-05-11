import styled from "styled-components";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchBoardDetail,
  likePost,
  unlikePost,
  dislikePost,
  undislikePost,
} from "../api/CommunityApi";
import type { BoardDetail } from "../api/CommunityApi";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchBoardDetail(id!);
        setPost(data);
        setUpCount(data.likeCount);
        setDownCount(data.dislikeCount);
        setLiked(data.liked);
        setDisliked(data.disliked);
      } catch (err) {
        console.error("상세 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  const handleLikeToggle = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    if (!post) return;
    try {
      if (liked) {
        await unlikePost(post.boardId);
        setUpCount((c) => c - 1);
      } else {
        await likePost(post.boardId);
        setUpCount((c) => c + 1);
        if (disliked) {
          await undislikePost(post.boardId);
          setDownCount((c) => c - 1);
          setDisliked(false);
        }
      }
      setLiked(!liked);
    } catch (err) {
      console.error("좋아요 처리 실패:", err);
    }
  };

  const handleDislikeToggle = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    if (!post) return;
    try {
      if (disliked) {
        await undislikePost(post.boardId);
        setDownCount((c) => c - 1);
      } else {
        await dislikePost(post.boardId);
        setDownCount((c) => c + 1);
        if (liked) {
          await unlikePost(post.boardId);
          setUpCount((c) => c - 1);
          setLiked(false);
        }
      }
      setDisliked(!disliked);
    } catch (err) {
      console.error("싫어요 처리 실패:", err);
    }
  };

  const handleAddComment = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (!comment.trim()) return;
    setComments((prev) => [...prev, comment]);
    setComment("");
  };

  if (loading) return <Wrapper>로딩 중...</Wrapper>;
  if (!post) return <Wrapper>게시글을 불러올 수 없습니다.</Wrapper>;

  return (
    <Wrapper>
      <Title>{post.title}</Title>
      <MetaInfo>작성일: {post.createdAt}</MetaInfo>
      <Content>{post.content}</Content>

      <FeedbackBox>
        <FeedbackGroup>
          <FeedbackButton
            onClick={handleLikeToggle}
            className={liked ? "active" : ""}
          >
            <FaRegThumbsUp />
          </FeedbackButton>
          <VoteCount>{upCount}</VoteCount>
        </FeedbackGroup>

        <FeedbackGroup>
          <FeedbackButton
            onClick={handleDislikeToggle}
            className={disliked ? "active" : ""}
          >
            <FaRegThumbsDown />
          </FeedbackButton>
          <VoteCount>{downCount}</VoteCount>
        </FeedbackGroup>
      </FeedbackBox>

      <CommentSection>
        <CommentInputWrapper>
          <CommentTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <CommentButton onClick={handleAddComment}>등록</CommentButton>
        </CommentInputWrapper>

        <CommentList>
          {comments.map((c, i) => (
            <CommentItem key={i}>
              <CommentAuthor>익명</CommentAuthor>
              <CommentContent>{c}</CommentContent>
            </CommentItem>
          ))}
        </CommentList>
      </CommentSection>
    </Wrapper>
  );
};

export default PostDetail;

const Wrapper = styled.div`
  padding: 5rem 5%;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
`;

const MetaInfo = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  white-space: pre-wrap;
  border-top: 1px solid #4e7c3a;
  padding-top: 1.5rem;
`;

const FeedbackBox = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 6rem;
`;

const FeedbackGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedbackButton = styled.button`
  width: 70px;
  height: 70px;
  font-size: 2rem;
  background-color: #ffffff;
  border: 2px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s ease all;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f1ffdb;
    border-color: #4e7c3a;
  }

  &.active {
    background-color: #f1ffdb;
    border-color: #4e7c3a;
  }
`;

const VoteCount = styled.div`
  margin-top: 0.5rem;
  font-size: 0.95rem;
  font-weight: 900;
`;

const CommentSection = styled.div`
  margin-top: 4rem;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CommentTextarea = styled.textarea`
  flex: 1;
  resize: none;
  padding: 0 1rem;
  font-size: 1rem;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;

  &:focus {
    outline: none;
    border-color: #4e7c3a;
  }
`;

const CommentButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #4e7c3a;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #3b602b;
  }
`;

const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentItem = styled.li`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 0.7rem 1rem;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CommentContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
`;
