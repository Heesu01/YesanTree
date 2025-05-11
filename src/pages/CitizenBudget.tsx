import styled from "styled-components";
import { useEffect, useState } from "react";
import BudgetTab from "../components/BudgetTab";
import { fetchCitizenBudget } from "../api/BudgetApi";

interface CitizenBudgetItem {
  bizName: string;
  budgetCost: string;
  year: string;
  location: string;
}

const CitizenBudget = () => {
  const [data, setData] = useState<CitizenBudgetItem[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchCitizenBudget(page);
        if (result.length === 0 && page > 1) {
          setPage((p) => Math.max(p - 1, 1));
          return;
        }
        setData(result);
      } catch (err) {
        console.error("시민예산 데이터를 불러오지 못했습니다.", err);
      }
    };
    load();
  }, [page]);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];

    let start = 1;

    if (page > 3) {
      start = page - 2;
    }

    for (let i = start; i < start + maxPagesToShow; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Wrapper>
      <BudgetTab />

      <ContentSection>
        <TitleRow>
          <TitleCell style={{ width: "50%" }}>사업명</TitleCell>
          <TitleCell style={{ width: "30%" }}>예산편성사업비</TitleCell>
          <TitleCell as={Cell} style={{ width: "20%" }} hideOnMobile>
            년도
          </TitleCell>
        </TitleRow>

        <BudgetList>
          {data.map((item, index) => (
            <BudgetItem key={index}>
              <Cell style={{ width: "50%" }}>{item.bizName}</Cell>
              <Cell style={{ width: "30%" }}>
                ₩ {Number(item.budgetCost.replace(/,/g, "")).toLocaleString()}
              </Cell>
              <Cell style={{ width: "20%" }} hideOnMobile>
                <span>{item.year}</span>
              </Cell>
            </BudgetItem>
          ))}
        </BudgetList>

        <PaginationWrapper>
          <PageButton onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            &lt;
          </PageButton>

          {getPageNumbers().map((p) => (
            <PageNumber
              key={p}
              className={p === page ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </PageNumber>
          ))}

          <PageButton onClick={() => setPage((p) => p + 1)}>&gt;</PageButton>
        </PaginationWrapper>
      </ContentSection>
    </Wrapper>
  );
};

export default CitizenBudget;

const Wrapper = styled.div``;

const ContentSection = styled.section`
  padding: 24px 80px;
  background: #fff;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  font-weight: bold;
  padding: 16px 0;
  border-bottom: 2px solid #ccc;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const TitleCell = styled.div`
  text-align: left;
`;

const BudgetList = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const BudgetItem = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
`;

const Cell = styled.div<{ hideOnMobile?: boolean }>`
  text-align: left;

  ${({ hideOnMobile }) =>
    hideOnMobile &&
    `
    @media (max-width: 768px) {
      display: none;
    }
  `}
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
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
