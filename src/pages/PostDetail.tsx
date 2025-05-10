import styled from "styled-components";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useState } from "react";

const PostDetail = () => {
  const post = {
    title: "이 사업, 예산 대비 효과 있다고 보시나요? [투표 요청]",
    date: "2025.05.03",
    content: `2025년 예산안 중 복지 예산이 충분히 효과를 거두고 있는지에 대한 토론이 활발합니다.
최근 발표된 시민 참여 사업의 결과 보고서에 따르면 예산 투입 대비 체감 효과가 낮은 사례도 있다는 의견이 있습니다.
다양한 시민 의견을 듣고 싶어 이 글을 작성했습니다. 많은 의견 부탁드립니다!`,
  };

  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    setComments((prev) => [...prev, comment]);
    setComment("");
  };

  return (
    <Wrapper>
      <Title>{post.title}</Title>
      <MetaInfo>작성일: {post.date}</MetaInfo>
      <Content>{post.content}</Content>

      <FeedbackBox>
        <FeedbackGroup>
          <FeedbackButton onClick={() => setUpCount((c) => c + 1)}>
            <FaRegThumbsUp />
          </FeedbackButton>
          <VoteCount>{upCount}</VoteCount>
        </FeedbackGroup>

        <FeedbackGroup>
          <FeedbackButton onClick={() => setDownCount((c) => c + 1)}>
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
