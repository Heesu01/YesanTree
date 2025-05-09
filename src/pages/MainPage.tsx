import styled, { keyframes } from "styled-components";
import home from "../assets/home.png";

const MainPage = () => {
  return (
    <Wrapper>
      <HeroSection>
        <HeroImage src={home} alt="메인 이미지" />
        <HeroText>
          내 손으로 만든 서울, <br />내 눈으로 본 예산
        </HeroText>
      </HeroSection>

      <IntroSection>
        <IntroText>
          누구나 쉽게 이해하는 예산 시각화 플랫폼
          <br />
          예산트리와 함께 공공데이터를 더 가깝게.
        </IntroText>
        <LoginButton>로그인</LoginButton>
      </IntroSection>
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
`;

const HeroSection = styled.section`
  position: relative;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const IntroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  /* background: linear-gradient(to right, #c5e9a7, #caefad); */
`;

const IntroText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const LoginButton = styled.button`
  padding: 1rem 2rem;
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
