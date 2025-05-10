import styled from "styled-components";
import BudgetTab from "../components/BudgetTab";

const citizenBudgetData = [
  {
    title: "지역 소공원 정비사업",
    amount: 30000000,
    year: 2025,
    location: "서울특별시 강동구",
  },
  {
    title: "골목길 안전조명 설치",
    amount: 12000000,
    year: 2025,
    location: "서울특별시 중랑구",
  },
  {
    title: "어르신 쉼터 개선",
    amount: 22000000,
    year: 2024,
    location: "서울특별시 마포구",
  },
  {
    title: "지역 소공원 정비사업",
    amount: 30000000,
    year: 2025,
    location: "서울특별시 강동구",
  },
  {
    title: "골목길 안전조명 설치",
    amount: 12000000,
    year: 2025,
    location: "서울특별시 중랑구",
  },
  {
    title: "어르신 쉼터 개선",
    amount: 22000000,
    year: 2024,
    location: "서울특별시 마포구",
  },
  {
    title: "지역 소공원 정비사업",
    amount: 30000000,
    year: 2025,
    location: "서울특별시 강동구",
  },
  {
    title: "골목길 안전조명 설치",
    amount: 12000000,
    year: 2025,
    location: "서울특별시 중랑구",
  },
  {
    title: "어르신 쉼터 개선",
    amount: 22000000,
    year: 2024,
    location: "서울특별시 마포구",
  },
  {
    title: "지역 소공원 정비사업",
    amount: 30000000,
    year: 2025,
    location: "서울특별시 강동구",
  },
  {
    title: "골목길 안전조명 설치",
    amount: 12000000,
    year: 2025,
    location: "서울특별시 중랑구",
  },
  {
    title: "어르신 쉼터 개선",
    amount: 22000000,
    year: 2024,
    location: "서울특별시 마포구",
  },
];

const CitizenBudget = () => {
  return (
    <Wrapper>
      <BudgetTab />

      <ContentSection>
        <TitleRow>
          <TitleCell>사업명</TitleCell>
          <TitleCell>예산편성사업비</TitleCell>
          <TitleCell as={Cell} hideOnMobile>
            년도
          </TitleCell>
          <TitleCell>사업위치</TitleCell>
        </TitleRow>

        <BudgetList>
          {citizenBudgetData.map((item, index) => (
            <BudgetItem key={index}>
              <Cell>{item.title}</Cell>
              <Cell>₩ {item.amount.toLocaleString()}</Cell>
              <Cell hideOnMobile>
                <span>{item.year}</span>
              </Cell>
              <Cell>{item.location}</Cell>
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
  flex: 1;
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
  flex: 1;
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
