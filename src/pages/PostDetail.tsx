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
    </Wrapper>
  );
};

export default PostDetail;

const Wrapper = styled.div`
  padding: 5rem 5%;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Pretendard", sans-serif;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  line-height: 1.4;
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
