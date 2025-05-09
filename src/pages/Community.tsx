import styled from "styled-components";
import communityIcon from "../assets/community.png";

const posts = [
  {
    id: 1,
    title: "이 사업, 예산 대비 효과 있다고 보시나요? [투표 요청]",
    date: "2025.05.03",
  },
  {
    id: 2,
    title: "자전거 도로 정비에 더 투자해야 하지 않을까요?",
    date: "2025.04.29",
  },
  {
    id: 3,
    title: "2025년 구 예산 중복 사업 정리 필요해 보여요",
    date: "2025.04.24",
  },
  {
    id: 4,
    title: "도봉공원 산책로 조명 설치, 예산 제안드립니다!",
    date: "2025.04.21",
  },
  {
    id: 5,
    title: "우리 동네 놀이터, 더 안전하게 만들 수 없을까요?",
    date: "2025.04.21",
  },
  {
    id: 3,
    title: "2025년 구 예산 중복 사업 정리 필요해 보여요",
    date: "2025.04.24",
  },
  {
    id: 4,
    title: "도봉공원 산책로 조명 설치, 예산 제안드립니다!",
    date: "2025.04.21",
  },
];

const popularPosts = [
  {
    id: 1,
    title: "작은 도서관 조성사업, 이 위치면 좋겠어요!",
    date: "2025.04.19",
  },
  {
    id: 2,
    title: "도봉공원 산책로 조명 설치, 예산 제안드립니다!",
    date: "2025.04.21",
  },
  {
    id: 3,
    title: "이 사업, 예산 대비 효과 있다고 보시나요? [투표 요청]",
    date: "2025.05.03",
  },
];

const CommunityPage = () => {
  return (
    <PageWrapper>
      <TitleArea>
        <Icon src={communityIcon} alt="커뮤니티 아이콘" />
        <Title>커뮤니티</Title>
      </TitleArea>

      <ContentArea>
        <LeftSection>
          <SortBox>
            <SortOption active>최신순</SortOption>
            <SortDivider>|</SortDivider>
            <SortOption>인기순</SortOption>
          </SortBox>

          {posts.map((post) => (
            <PostItem key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>{post.date}</PostDate>
            </PostItem>
          ))}

          <Pagination>
            &lt; <CurrentPage>1</CurrentPage> 2 3 4 5 &gt;
          </Pagination>
        </LeftSection>

        <RightSection>
          <PopularTitle>인기글 TOP3</PopularTitle>
          {popularPosts.map((post) => (
            <PopularPost key={post.id}>
              <p>{post.title}</p>
              <span>{post.date}</span>
            </PopularPost>
          ))}
        </RightSection>
      </ContentArea>
    </PageWrapper>
  );
};

export default CommunityPage;

const PageWrapper = styled.div`
  padding: 1rem 5%;
  height: 92vh;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 5px solid #4e7c3a;
  width: 300px;
  height: 120px;
`;

const Icon = styled.img`
  width: 8rem;
  height: 8rem;
  margin-left: -13px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-family: ${({ theme }) => theme.fonts.logo.fontFamily};
  margin-left: -20px;
  margin-top: 40px;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
`;

const LeftSection = styled.div`
  flex: 3;
`;

const RightSection = styled.aside`
  flex: 1;
  padding-left: 2rem;
`;

const SortBox = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #777;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const SortOption = styled.span<{ active?: boolean }>`
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#222" : "#777")};
  cursor: pointer;
`;

const SortDivider = styled.span`
  margin: 0 0.5rem;
`;

const PostItem = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
`;

const PostTitle = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const PostDate = styled.span`
  font-size: 0.8rem;
  color: #aaa;
`;

const Pagination = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
`;

const CurrentPage = styled.span`
  font-weight: bold;
  color: #1e1e1e;
`;

const PopularTitle = styled.h4`
  margin-bottom: 1rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.title.fontFamily};
`;

const PopularPost = styled.div`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 1rem;

  p {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: 600;
  }

  span {
    font-size: 0.8rem;
    color: #777;
  }
`;
