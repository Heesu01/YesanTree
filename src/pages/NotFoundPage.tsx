import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import notFoundImage from "../assets/404.png";

const NotFoundPage = () => {
  // const navigate = useNavigate();

  return (
    <Wrapper>
      <Image src={notFoundImage} alt="404 Not Found" />
      {/* <HomeButton onClick={() => navigate("/")}>홈으로 돌아가기</HomeButton> */}
    </Wrapper>
  );
};

export default NotFoundPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9fff4;
`;

const Image = styled.img`
  width: 500px;
  max-width: 100%;
  margin-bottom: 50px;
`;

// const HomeButton = styled.button`
//   padding: 12px 24px;
//   font-size: 16px;
//   border: none;
//   border-radius: 12px;
//   background-color: #6ecf7c;
//   color: white;
//   cursor: pointer;
//   transition: background-color 0.2s ease;

//   &:hover {
//     background-color: #5bb96b;
//   }
// `;
