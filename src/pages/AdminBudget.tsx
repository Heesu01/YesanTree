import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { FiInfo } from "react-icons/fi";
import BudgetTab from "../components/BudgetTab";
import BudgetChart from "../components/BudgetChart";
import PieChartBox from "../components/PieChartBox";
import { fetchSimpleBudget } from "../api/BudgetApi";

interface SimpleBudgetItem {
  deptName: string;
  value: string;
  fieldName: string;
  bgColor: string;
  textColor: string;
}

const AdminBudget = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [field, setField] = useState("NATN_CURR_AMT");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<SimpleBudgetItem[]>([]);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchSimpleBudget(page, field);
        setData(res);
      } catch (err) {
        console.error("예산 데이터를 불러오지 못했습니다.", err);
      }
    };
    load();
  }, [page, field]);

  const handleFieldChange = (newField: string) => {
    setField(newField);
    setPage(1);
  };

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));

    for (let i = startPage; i < startPage + maxPagesToShow; i++) {
      pages.push(
        <PageNumber
          key={i}
          className={i === page ? "active" : ""}
          onClick={() => setPage(i)}
        >
          {i}
        </PageNumber>
      );
    }
    return pages;
  };

  return (
    <Wrapper>
      <BudgetTab />

      <ContentSection>
        <MainContent>
          <LeftSection>
            <CategoryFilter>
              <FilterBtns>
                <FilterButton
                  className={field === "NATN_CURR_AMT" ? "active" : ""}
                  onClick={() => handleFieldChange("NATN_CURR_AMT")}
                >
                  국비
                </FilterButton>
                <FilterButton
                  className={field === "SIDO_CURR_AMT" ? "active" : ""}
                  onClick={() => handleFieldChange("SIDO_CURR_AMT")}
                >
                  도비
                </FilterButton>

                <FilterButton
                  className={field === "COMPO_AMT" ? "active" : ""}
                  onClick={() => handleFieldChange("COMPO_AMT")}
                >
                  편성액
                </FilterButton>
                <FilterButton
                  className={field === "SUB_SUM_CURR_AMT" ? "active" : ""}
                  onClick={() => handleFieldChange("SUB_SUM_CURR_AMT")}
                >
                  소계
                </FilterButton>
              </FilterBtns>
              <InfoBoxWrapper ref={infoRef}>
                <InfoButton onClick={() => setShowInfo(!showInfo)}>
                  <FiInfo />
                </InfoButton>
                <InfoTooltip className={showInfo ? "show" : "hide"}>
                  <p>
                    <strong>국비</strong>: 중앙정부 예산
                  </p>
                  <p>
                    <strong>도비</strong>: 지방자치단체 예산
                  </p>
                  <p>
                    <strong>편성액</strong>: 처음 계획된 예산
                  </p>
                  <p>
                    <strong>소계</strong>: 항목별 예산 총합
                  </p>
                </InfoTooltip>
              </InfoBoxWrapper>
            </CategoryFilter>

            <BudgetList>
              {data.map((item, index) => (
                <BudgetItem key={index}>
                  <Tag color={item.bgColor} textColor={item.textColor}>
                    {item.fieldName}
                  </Tag>
                  <Title>{item.deptName}</Title>
                  <Amount>
                    ₩ {Number(item.value.replace(/,/g, "")).toLocaleString()}
                  </Amount>
                </BudgetItem>
              ))}
            </BudgetList>

            <PaginationWrapper>
              <PageButton onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                &lt;
              </PageButton>
              {renderPageNumbers()}
              <PageButton onClick={() => setPage((p) => p + 1)}>
                &gt;
              </PageButton>
            </PaginationWrapper>
          </LeftSection>

          <RightSection>
            <BudgetChart />
            <PieChartBox />
          </RightSection>
        </MainContent>
      </ContentSection>
    </Wrapper>
  );
};

export default AdminBudget;

const Wrapper = styled.div``;

const ContentSection = styled.section`
  padding: 24px 80px;
  background: #fff;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
`;

const FilterBtns = styled.button`
  display: flex;
  gap: 20px;
  background-color: #fff;
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &.active {
    background-color: #6dad5b;
    color: white;
  }
`;

const InfoBoxWrapper = styled.div`
  position: relative;
`;

const InfoButton = styled.button`
  background: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
`;

const InfoTooltip = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  width: 200px;
  background: #fff;
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: all 0.2s ease;

  &.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  p {
    margin: 6px 0;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 40px;
`;

const LeftSection = styled.div`
  flex: 2;
`;

const RightSection = styled.div`
  flex: 1.5;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BudgetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BudgetItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 16px 5px;
`;

const Tag = styled.span<{ color: string; textColor?: string }>`
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor || "#000"};
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Title = styled.span`
  flex: 1;
  margin: 0 20px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Amount = styled.span`
  font-family: ${({ theme }) => theme.fonts.num.fontFamily};

  @media (max-width: 768px) {
    font-size: 13px;
  }
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
