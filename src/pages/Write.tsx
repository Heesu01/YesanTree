import React, { useState } from "react";
import styled from "styled-components";
import { createPost } from "../api/CommunityApi";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await createPost({ title, content });
      alert("글이 등록되었습니다!");
      navigate("/community");
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <Header>글쓰기</Header>
      <Form onSubmit={handleSubmit}>
        <Label>제목</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          required
        />

        <Label>내용</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          required
        />

        <SubmitButton type="submit">등록</SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default Write;

const Wrapper = styled.div`
  padding: 4rem 5%;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h2`
  font-size: 2rem;
  border-bottom: 5px solid #4e7c3a;
  display: inline-block;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.title.fontFamily};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #4e7c3a;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  min-height: 300px;

  &:focus {
    border-color: #4e7c3a;
  }
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #4e7c3a;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #3d622e;
  }
`;
