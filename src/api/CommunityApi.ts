import { Axios } from "./Axios";
import { getUserInfo } from "./UserApi";

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
  writer: string;
}

export interface Comment {
  commentId: string;
  userName: string;
  content: string;
  createdAt: string;
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

// 게시글 상세 조회
export const fetchBoardDetail = async (
  boardId: string
): Promise<BoardDetail> => {
  try {
    let isLoggedIn = false;

    try {
      await getUserInfo();
      isLoggedIn = true;
    } catch {
      isLoggedIn = false;
    }

    const url = isLoggedIn ? `/boards/${boardId}` : `/boards/one/${boardId}`;

    const response = await Axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("게시글 상세 조회 오류:", error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (boardId: string): Promise<void> => {
  try {
    await Axios.delete(`/boards/${boardId}`);
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
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

// 댓글 조회
export const fetchComments = async (boardId: string): Promise<Comment[]> => {
  try {
    const response = await Axios.get(`/comments/get/${boardId}`);
    return response.data.data.commentList;
  } catch (error) {
    console.error("댓글 조회 실패:", error);
    throw error;
  }
};

// 댓글 작성
export const createComment = async (
  boardId: string,
  content: string
): Promise<void> => {
  try {
    await Axios.post(`/comments/${boardId}`, { content });
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await Axios.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw error;
  }
};
