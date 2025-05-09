import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import home from "../assets/home.png";
import { IoIosArrowDown } from "react-icons/io";

const MainPage = () => {
  const loginRef = useRef<HTMLDivElement>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowLogin(true);
      },
      { threshold: 0.3 }
    );

    if (loginRef.current) observer.observe(loginRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper>
      <HeroSection>
        <HeroImage src={home} alt="메인 이미지" />
        <HeroText>
          내 손으로 만든 서울, <br />내 눈으로 본 예산
        </HeroText>
        <ScrollIndicator>
          <IoIosArrowDown />
          <IoIosArrowDown />
        </ScrollIndicator>
      </HeroSection>

      <LoginSection ref={loginRef} $visible={showLogin}>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
          <SubmitButton>로그인</SubmitButton>
        </LoginForm>
      </LoginSection>
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background: linear-gradient(to right, #c5e9a7, #caefad);
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to right, #c5e9a7, #caefad);
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
`;

const fadeSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(-90%, -100%);
  }
  100% {
    opacity: 1;
    transform: translate(-90%, -90%);
  }
`;

const HeroText = styled.h1`
  position: absolute;
  top: 28%;
  left: 40%;
  font-family: ${({ theme }) => theme.fonts.logo.fontFamily};
  transform: translate(-90%, -90%);
  color: ${({ theme }) => theme.colors.logo};
  font-size: 3.4em;
  text-align: end;
  line-height: 1.5em;
  animation: ${fadeSlideUp} 1.2s ease-out;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.logo};
    animation: bounce 1.5s infinite;
  }

  svg:nth-child(2) {
    animation-delay: 0.2s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.8;
    }
    50% {
      transform: translateY(8px);
      opacity: 1;
    }
  }
`;

const LoginSection = styled.section<{ $visible: boolean }>`
  padding: 5rem 0;
  text-align: center;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;

  ${({ $visible }) =>
    $visible &&
    `opacity: 1;
    transform: translateY(0);
  `}
`;

const LoginTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.title.fontFamily};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const SubmitButton = styled.button`
  padding: 0.8em;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #388e3c;
  }
`;
