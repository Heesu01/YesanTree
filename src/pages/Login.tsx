import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { login } from "../api/UserApi";
import logoImg from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "로그인에 실패했습니다.");
      } else {
        alert("예상치 못한 에러가 발생했습니다.");
      }
    }
  };

  return (
    <Wrapper>
      <Logo onClick={() => navigate("/")} src={logoImg} alt="예산트리 로고" />

      <LoginBox>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="이메일 아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">로그인</SubmitButton>
          <SignupLink onClick={() => navigate("/signup")}>
            회원가입하러 가기 →
          </SignupLink>
        </Form>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  min-height: 100vh;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    background: #fff;
  }
`;

const Logo = styled.img`
  width: 300px;
  margin-right: 60px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginBox = styled.div`
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    box-shadow: none;
  }
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
