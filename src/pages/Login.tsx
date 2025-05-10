import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("로그인 시도!");
  };

  return (
    <Wrapper>
      <Logo onClick={() => navigate("/")} src={logoImg} alt="예산트리 로고" />

      <LoginBox>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="아이디" required />
          <Input type="password" placeholder="비밀번호" required />
          <SubmitButton type="submit">로그인</SubmitButton>
          <SignupLink onClick={() => navigate("/signup")}>
            회원가입하러 가기 →
          </SignupLink>
        </Form>
      </LoginBox>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  min-height: 100vh;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 300px;
  margin-right: 60px;
  cursor: pointer;
`;

const LoginBox = styled.div`
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.title.fontFamily};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;

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
  font-weight: bold;

  &:hover {
    background-color: #388e3c;
  }
`;

const SignupLink = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: #4caf50;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
