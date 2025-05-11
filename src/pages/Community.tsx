import styled from "styled-components";
import communityIcon from "../assets/community.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllPosts, fetchTop3Posts } from "../api/CommunityApi";
import type { Board } from "../api/CommunityApi";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Board[]>([]);
  const [topPosts, setTopPosts] = useState<Board[]>([]);
  const [sortType, setSortType] = useState<"latest" | "popular">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleWriteClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    navigate("/write");
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchAllPosts(sortType);
        setPosts(data);
        setCurrentPage(1);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    const loadTopPosts = async () => {
      try {
        const data = await fetchTop3Posts();
        setTopPosts(data);
      } catch (err) {
        console.error("Top3 불러오기 실패:", err);
      }
    };

    loadPosts();
    loadTopPosts();
  }, [sortType]);

  return (
    <PageWrapper>
      <TitleArea>
        <Icon src={communityIcon} alt="커뮤니티 아이콘" />
        <Title>커뮤니티</Title>
      </TitleArea>

      <ContentArea>
        <LeftSection>
          <SortBox>
            <SortOption
              active={sortType === "latest"}
              onClick={() => setSortType("latest")}
            >
              최신순
            </SortOption>
            <SortDivider>|</SortDivider>
            <SortOption
              active={sortType === "popular"}
              onClick={() => setSortType("popular")}
            >
              인기순
            </SortOption>
          </SortBox>

          {currentPosts.length === 0 ? (
            <NoPostMessage>작성된 글이 없습니다.</NoPostMessage>
          ) : (
            currentPosts.map((post) => (
              <PostItem
                key={post.boardId}
                onClick={() => navigate(`/community/${post.boardId}`)}
              >
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{post.createdAt}</PostDate>
              </PostItem>
            ))
          )}

          <WriteSection>
            <WriteButton onClick={handleWriteClick}>글쓰기</WriteButton>
          </WriteSection>

          <PaginationWrapper>
            <PageButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &lt;
            </PageButton>

            {[...Array(totalPages)].map((_, index) => (
              <PageNumber
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </PageNumber>
            ))}

            <PageButton
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              &gt;
            </PageButton>
          </PaginationWrapper>
        </LeftSection>

        <RightSection>
          <PopularTitle>인기글 TOP3</PopularTitle>
          {topPosts.length === 0 ? (
            <NoPostMessage>인기글이 없습니다.</NoPostMessage>
          ) : (
            topPosts.map((post) => (
              <PopularPost
                key={post.boardId}
                onClick={() => navigate(`/community/${post.boardId}`)}
              >
                <p>{post.title}</p>
                <span>{post.createdAt}</span>
              </PopularPost>
            ))
          )}
        </RightSection>
      </ContentArea>
    </PageWrapper>
  );
};

export default CommunityPage;

const PageWrapper = styled.div`
  padding: 1rem 5%;
  height: 10%;
  margin-bottom: 20px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 5px solid #4e7c3a;
  width: 300px;
  height: 120px;

  @media (max-width: 768px) {
    width: 230px;
    margin-bottom: 20px;
  }
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const SortBox = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #777;
  display: flex;
  width: 100%;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SortOption = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#222" : "#777")};
  cursor: pointer;
`;

const SortDivider = styled.span`
  margin: 0 0.5rem;
`;

const NoPostMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #aaa;
  font-size: 1rem;
`;

const PostItem = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #000;
  }
`;

const PageNumber = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #f4f4f4;
  cursor: pointer;
  font-weight: bold;
  color: #444;

  &.active {
    background-color: #6dad5b;
    color: white;
  }
`;

const WriteSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const WriteButton = styled.button`
  margin-top: 1.5rem;
  background-color: #4e7c3a;
  color: white;
  border: none;
  padding: 6px 12px;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #3d622e;
  }
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
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }

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
