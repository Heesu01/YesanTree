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

export interface FieldTop5BudgetItem {
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

// 분야별 Top5 예산 조회
export const fetchTop5ByField = async (): Promise<FieldTop5BudgetItem[]> => {
  const response = await Axios.get("/api/budget-by-field/top5");
  return response.data;
};

// 검색 - 행정 예산
export const searchAdminBudget = async (
  keyword: string
): Promise<SimpleBudgetItem[]> => {
  const response = await Axios.get(
    `/api/budget/search/admin?keyword=${keyword}`
  );
  return response.data.data;
};

// 검색 - 시민 예산
export const searchCitizenBudget = async (
  keyword: string
): Promise<CitizenBudgetItem[]> => {
  const response = await Axios.get(
    `/api/budget/search/citizen?keyword=${keyword}`
  );
  return response.data.data;
};
