import { Axios } from "./Axios";

export interface SimpleBudgetItem {
  deptName: string;
  value: string;
  fieldName: string;
  bgColor: string;
  textColor: string;
}

export interface CitizenBudgetItem {
  bizName: string;
  budgetCost: string;
  year: string;
  location: string;
}

export interface TopBudgetItem {
  deptName: string;
  value: string;
}

// 행정 예산 조회
export const fetchSimpleBudget = async (
  page: number,
  field: string
): Promise<SimpleBudgetItem[]> => {
  const response = await Axios.get(
    `/api/budget/simple?page=${page}&field=${field}`
  );
  return response.data;
};

// 시민 참여 예산 조회
export const fetchCitizenBudget = async (
  page: number
): Promise<CitizenBudgetItem[]> => {
  const response = await Axios.get(`/api/budget/citizen?page=${page}`);
  return response.data;
};

// Top 10 예산 조회
export const fetchTop10Budget = async (
  field: string
): Promise<TopBudgetItem[]> => {
  const response = await Axios.get(`/api/budget/top10?field=${field}`);
  return response.data;
};
