import { Axios } from "./Axios";

export interface Board {
  boardId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface BoardDetail extends Board {
  likeCount: number;
  dislikeCount: number;
  liked: boolean;
  disliked: boolean;
}

// 게시글 작성
export const createPost = async (data: {
  title: string;
  content: string;
}): Promise<void> => {
  try {
    await Axios.post("/boards", data);
  } catch (error) {
    console.error("게시글 작성 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 전체 조회
export const fetchAllPosts = async (
  sort: "latest" | "popular" = "latest"
): Promise<Board[]> => {
  try {
    const response = await Axios.get(`/boards/all?sort=${sort}`);
    return response.data.data.boardList;
  } catch (error) {
    console.error("게시글 전체 조회 오류:", error);
    throw error;
  }
};

// 게시글 상세 조회 (로그인 여부로 분기)
export const fetchBoardDetail = async (
  boardId: string
): Promise<BoardDetail> => {
  try {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // ✅
    const url = isLoggedIn ? `/boards/${boardId}` : `/boards/one/${boardId}`;

    const response = await Axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("게시글 상세 조회 오류:", error);
    throw error;
  }
};

// 좋아요 추가
export const likePost = async (boardId: string): Promise<void> => {
  try {
    await Axios.post(`/boards/${boardId}/like`);
  } catch (error) {
    console.error("좋아요 추가 실패:", error);
    throw error;
  }
};

// 좋아요 삭제
export const unlikePost = async (boardId: string): Promise<void> => {
  try {
    await Axios.delete(`/boards/${boardId}/like`);
  } catch (error) {
    console.error("좋아요 삭제 실패:", error);
    throw error;
  }
};

// 싫어요 추가
export const dislikePost = async (boardId: string): Promise<void> => {
  try {
    await Axios.post(`/boards/${boardId}/dislike`);
  } catch (error) {
    console.error("싫어요 추가 실패:", error);
    throw error;
  }
};

// 싫어요 삭제
export const undislikePost = async (boardId: string): Promise<void> => {
  try {
    await Axios.delete(`/boards/${boardId}/dislike`);
  } catch (error) {
    console.error("싫어요 삭제 실패:", error);
    throw error;
  }
};

// 인기 게시글 조회
export const fetchTop3Posts = async (): Promise<Board[]> => {
  try {
    const response = await Axios.get("/boards/top");
    return response.data.data ?? [];
  } catch (error) {
    console.error("Top3 게시글 조회 실패:", error);
    return [];
  }
};
