import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { signup } from "../api/UserApi";
import logoImg from "../assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,20}$/;

  const validateFields = () => {
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "비밀번호는 영문, 숫자, 특수문자 포함 8~20자 이내여야 합니다."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) return;

    try {
      await signup({ email, password, name });
      localStorage.setItem("isLoggedIn", "true");
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "회원가입에 실패했습니다.");
      } else {
        alert("예상치 못한 에러가 발생했습니다.");
      }
    }
  };

  return (
    <Wrapper>
      <Logo onClick={() => navigate("/")} src={logoImg} alt="예산트리 로고" />
      <SignupBox>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="이메일 아이디"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!emailRegex.test(e.target.value)) {
                setEmailError("이메일 형식이 올바르지 않습니다.");
              } else {
                setEmailError("");
              }
            }}
            required
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}

          <Input
            type="text"
            placeholder="닉네임"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!passwordRegex.test(e.target.value)) {
                setPasswordError(
                  "비밀번호는 영문, 숫자, 특수문자 포함 8~20자 이내여야 합니다."
                );
              } else {
                setPasswordError("");
              }
            }}
            required
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}

          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (password !== e.target.value) {
                setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
              } else {
                setConfirmPasswordError("");
              }
            }}
            required
          />
          {confirmPasswordError && (
            <ErrorText>{confirmPasswordError}</ErrorText>
          )}

          <SubmitButton type="submit">가입하기</SubmitButton>
          <LoginLink onClick={() => navigate("/login")}>
            이미 계정이 있으신가요? 로그인하기
          </LoginLink>
        </Form>
      </SignupBox>
    </Wrapper>
  );
};

export default Signup;

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

const SignupBox = styled.div`
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

const LoginLink = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: #4caf50;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  font-size: 0.7rem;
  color: red;
  margin-left: 10px;
  margin-top: -5px;
`;
