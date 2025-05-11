import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import home from "../assets/home.png";
import AdminIcon from "../assets/admin.png";
import CitizenIcon from "../assets/citizen.png";

const BudgetTab = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    console.log("검색:", searchValue);
  };

  const isAdmin = location.pathname.includes("/budget/admin");
  const isCitizen = location.pathname.includes("/budget/citizen");

  return (
    <SectionWrapper>
      <HeroImage src={home} alt="메인 이미지" />
      <SearchBarWrapper>
        <SearchInput
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="찾고 싶은 예산 키워드를 입력해보세요."
        />
        <SearchButton onClick={handleSearch}>
          <IconBox>
            <FiSearch size={20} />
          </IconBox>
        </SearchButton>
      </SearchBarWrapper>

      <TabWrapper>
        <TabContainer>
          <Tab onClick={() => navigate("/budget/admin")}>
            <Icon src={AdminIcon} alt="행정" />
            <TabLabel>서울시 행정 예산</TabLabel>
          </Tab>
          {isAdmin && <Triangle />}
        </TabContainer>

        <TabContainer>
          <Tab onClick={() => navigate("/budget/citizen")}>
            <Icon src={CitizenIcon} alt="시민" />
            <TabLabel>시민 참여 예산</TabLabel>
          </Tab>
          {isCitizen && <Triangle />}
        </TabContainer>
      </TabWrapper>
    </SectionWrapper>
  );
};

export default BudgetTab;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #e9f5e8;
  padding: 40px 0;
  height: 280px;
  position: relative;
  z-index: 0;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
  z-index: 0;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  width: 60%;
  max-width: 800px;
  background: white;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px;
  font-size: 16px;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  width: 10%;
  padding: 0 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12rem;
  margin-top: 40px;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 3rem;
  }
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Icon = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
`;

const TabLabel = styled.div`
  margin-top: 8px;
  color: #333;
  font-family: ${({ theme }) => theme.fonts.title.fontFamily};
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Triangle = styled.div`
  position: absolute;
  bottom: -37%;
  left: 50%;
  transform: translateX(-50%) rotate(180deg);
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 30px solid #ffffff;
`;
