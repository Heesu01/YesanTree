import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { FiInfo } from "react-icons/fi";
import BudgetTab from "../components/BudgetTab";
import BudgetChart from "../components/BudgetChart";

const adminBudgetData = [
  {
    category: "문화및관광",
    title: "국가유산 야행",
    amount: 272_000_000,
    color: "#fbb",
  },
  {
    category: "소방특별회계",
    title: "119특수구조단 행정지원과",
    amount: 9_3_000_000,
    color: "#fdd",
  },
  {
    category: "보건",
    title: "지방의료원 정보화 지원",
    amount: 26_000_000,
    color: "#ffc",
  },
  {
    category: "문화및관광",
    title: "신나는 주말체육 프로그램 지원",
    amount: 567_615_000,
    color: "#fbb",
  },
  {
    category: "환경",
    title: "전기차 보급",
    amount: 73_7_726_500,
    color: "#ccf",
  },
  {
    category: "사회복지",
    title: "장애인등록진단비 지원",
    amount: 93_300_000,
    color: "#cfc",
  },
];

const AdminBudget = () => {
  const [showInfo, setShowInfo] = useState(false);
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

  return (
    <Wrapper>
      <BudgetTab />

      <ContentSection>
        <MainContent>
          <LeftSection>
            <CategoryFilter>
              <FilterBtns>
                <FilterButton className="active">국비</FilterButton>
                <FilterButton>도비</FilterButton>
                <FilterButton>편성액</FilterButton>
                <FilterButton>소계</FilterButton>
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
              {adminBudgetData.map((item, index) => (
                <BudgetItem key={index}>
                  <Tag color={item.color}>{item.category}</Tag>
                  <Title>{item.title}</Title>
                  <Amount>₩ {item.amount.toLocaleString()}</Amount>
                </BudgetItem>
              ))}
            </BudgetList>

            <PaginationWrapper>
              <PageButton>&lt;</PageButton>
              <PageNumber className="active">1</PageNumber>
              <PageNumber>2</PageNumber>
              <PageNumber>3</PageNumber>
              <PageButton>&gt;</PageButton>
            </PaginationWrapper>
          </LeftSection>

          <RightSection>
            <BudgetChart />
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

const Tag = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
`;

const Title = styled.span`
  flex: 1;
  margin: 0 20px;
  font-weight: 500;
`;

const Amount = styled.span`
  font-family: ${({ theme }) => theme.fonts.num.fontFamily};
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
