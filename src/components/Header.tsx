import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logoImg from "../assets/logo.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderWrapper>
      <LeftArea>
        <Logo onClick={handleLogoClick} src={logoImg} alt="예산트리 로고" />
      </LeftArea>

      <RightArea>
        <Nav>
          <StyledLink to="/" $active={currentPath === "/"}>
            홈
          </StyledLink>
          <StyledLink to="/budget" $active={currentPath === "/budget"}>
            예산현황
          </StyledLink>
          <StyledLink to="/community" $active={currentPath === "/community"}>
            커뮤니티
          </StyledLink>
        </Nav>
        <LoginButton>로그인</LoginButton>
      </RightArea>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
  height: 100%;
`;

const Logo = styled.img`
  height: 100%;
  cursor: pointer;
`;

const RightArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Nav = styled.nav`
  display: flex;
  gap: 4vw;
  height: 100%;
  align-items: flex-end;
`;

const StyledLink = styled(Link)<{ $active: boolean }>`
  font-size: 16px;
  width: 12vw;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  padding-bottom: 10px;
  border-bottom: 2.5px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray2};
  }
`;

const LoginButton = styled.button`
  background: none;
  padding: 6px 12px;
  font-weight: bold;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.black};
  }
`;
