import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <Text>
        본 서비스는 서울 열린데이터 광장에서 제공하는 <br />
        <strong>서울시 세출운용 사업 및 예산 정보</strong>,{" "}
        <strong>시민참여예산사업 예산집행 정보</strong>를 활용하여
        제작되었습니다. <br />ⓒ Seoul Open Data Plaza
      </Text>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 30px 0;
  background-color: #f7f9f4;
  text-align: center;
`;

const Text = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray3};
  line-height: 1.6;
`;
