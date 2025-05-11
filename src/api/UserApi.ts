import { Axios } from "./Axios";
import axios from "axios";

interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

// 회원가입
export const signup = async (payload: SignupPayload) => {
  try {
    const response = await Axios.post("/auth/signup", payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("예상치 못한 에러가 발생했습니다.");
    }
  }
};

// 로그인
export const login = async (payload: LoginPayload) => {
  try {
    const response = await Axios.post("/auth/login", payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("예상치 못한 에러가 발생했습니다.");
    }
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const response = await Axios.get("/auth/logout");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("예상치 못한 에러가 발생했습니다.");
    }
  }
};

// 사용자 정보 조회
export const getUserInfo = async (): Promise<{ name: string }> => {
  try {
    const response = await Axios.get("/users/info");
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("예상치 못한 에러가 발생했습니다.");
    }
  }
};
