import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import logoImg from "../assets/logo.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <HeaderWrapper>
      <LeftArea>
        <Logo onClick={() => navigate("/")} src={logoImg} alt="예산트리 로고" />
      </LeftArea>

      <MobileMenuIcon onClick={toggleMenu}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </MobileMenuIcon>

      <RightArea $menuOpen={menuOpen}>
        <Nav>
          <StyledLink
            to="/"
            $active={currentPath === "/"}
            onClick={() => setMenuOpen(false)}
          >
            홈
          </StyledLink>
          <StyledLink
            to="/budget/admin"
            $active={currentPath.startsWith("/budget")}
            onClick={() => setMenuOpen(false)}
          >
            예산현황
          </StyledLink>
          <StyledLink
            to="/community"
            $active={currentPath.startsWith("/community")}
            onClick={() => setMenuOpen(false)}
          >
            커뮤니티
          </StyledLink>
        </Nav>
        <Btns>
          <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
          <LoginButton onClick={() => navigate("/signup")}>
            회원가입
          </LoginButton>
        </Btns>
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

  @media (max-width: 768px) {
    padding: 0 16px;
  }
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

const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 768px) {
    display: block;
  }
`;

const RightArea = styled.div<{ $menuOpen: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 0;
    background: rgba(255, 255, 255, 0.876);
    width: 100%;
    z-index: 999;
    display: ${({ $menuOpen }) => ($menuOpen ? "flex" : "none")};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4vw;
  height: 100%;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    gap: 0;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 20px;
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary : "transparent"};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.white : theme.colors.black};
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
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
