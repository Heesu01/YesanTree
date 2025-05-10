import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import home from "../assets/home.png";
import treeIcon from "../assets/tree.png";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const aboutRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowAbout(true);
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper>
      <HeroSection>
        <HeroImage src={home} alt="메인 이미지" />
        <HeroText>
          내 손으로 만든 서울, <br />내 눈으로 본 예산
        </HeroText>
        <HeroScrollIndicator>
          <IoIosArrowDown />
          <IoIosArrowDown />
        </HeroScrollIndicator>
      </HeroSection>

      <AboutSection>
        <AboutInner>
          <SectionTitle>예산트리는 무엇인가요?</SectionTitle>
          <AboutGrid ref={aboutRef} $visible={showAbout}>
            <AboutCard>
              <CardHeader>
                <img src={treeIcon} alt="트리 아이콘" />
                <h3>예산 시각화</h3>
              </CardHeader>
              <p>
                복잡한 예산 데이터를 누구나 쉽게 이해할 수 있게 시각화합니다.
              </p>
            </AboutCard>
            <AboutCard>
              <CardHeader>
                <img src={treeIcon} alt="트리 아이콘" />
                <h3>시민 참여</h3>
              </CardHeader>
              <p>
                예산에 대해 의견을 제시하고 토론할 수 있는 커뮤니티 공간을
                제공합니다.
              </p>
            </AboutCard>
            <AboutCard>
              <CardHeader>
                <img src={treeIcon} alt="트리 아이콘" />
                <h3>공공 데이터</h3>
              </CardHeader>
              <p>
                서울시 열린데이터 광장의 데이터를 기반으로 투명하게 정보를
                제공합니다.
              </p>
            </AboutCard>
          </AboutGrid>
          <ScrollIndicator>
            <h1>로그인하고 예산트리에 참여해보세요!</h1>
            <IoIosArrowDown />
          </ScrollIndicator>
        </AboutInner>
      </AboutSection>

      <LoginBgc>
        <LoginSection ref={loginRef} $visible={showLogin}>
          <LoginTitle>로그인</LoginTitle>
          <LoginForm>
            <Input type="text" placeholder="아이디" />
            <Input type="password" placeholder="비밀번호" />
            <SubmitButton>로그인</SubmitButton>
            <SignupLink onClick={() => navigate("/signup")}>
              <span>계정이 없으신가요?</span>
              <p>회원가입하러 가기</p>
            </SignupLink>
          </LoginForm>
        </LoginSection>
      </LoginBgc>
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
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.6;
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
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: bold;
    font-size: 1.4em;
    margin-bottom: 10px;
  }

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

const HeroScrollIndicator = styled(ScrollIndicator)`
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
`;

const AboutSection = styled.section`
  background-color: #f7f9f4;
  padding: 6rem 2rem 2rem 2rem;
`;

const AboutInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.title.fontFamily};
`;

const AboutGrid = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;

  ${({ $visible }) =>
    $visible &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;

const AboutCard = styled.div`
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  background: linear-gradient(to right, #c5e9a7, #caefad);
  margin-bottom: 20px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #2f6633;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }

  &:hover {
    transform: translateY(-6px);
    background: linear-gradient(to right, #b5e48f, #b7f984);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  gap: 0.6rem;
  margin-bottom: 1rem;

  img {
    width: 60px;
    height: 60px;
  }

  h3 {
    font-size: 1.3rem;
    color: #2f6633;
    margin: 0;
    font-weight: bold;
    margin-left: -20px;
    margin-top: 15px;
  }
`;

const LoginBgc = styled.div`
  background: linear-gradient(to bottom, #f7f9f4, #caefad);
`;

const LoginSection = styled.section<{ $visible: boolean }>`
  padding: 5rem 0 10rem 0;
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
  border: 1px solid #f7f9f4;
  border-radius: 6px;

  &:focus {
    outline: 2px solid #93af7d;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
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

const SignupLink = styled.div`
  margin-top: 2px;
  padding: 0 4px;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  p {
    color: #4caf50;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    color: gray;
  }
`;
