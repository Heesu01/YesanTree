import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import moneyIcon from "../assets/money.png";

const adminBudgetData = [
  {
    category: "문화및관광",
    title: "국가유산 야행",
    amount: 272_000_000,
    color: "#fbb",
  },
  {
    category: "소방특별회계",
    title: "119특수구조단 행정지원과",
    amount: 6_30_000_000,
    color: "#fdd",
  },
  {
    category: "보건",
    title: "지방의료원 정보화 지원",
    amount: 26_000_000,
    color: "#ffc",
  },
  {
    category: "문화및관광",
    title: "신나는 주말체육 프로그램 지원",
    amount: 567_615_000,
    color: "#fbb",
  },
  {
    category: "환경",
    title: "전기차 보급",
    amount: 73_787_726_5,
    color: "#ccf",
  },
  {
    category: "사회복지",
    title: "장애인등록진단비 지원",
    amount: 93_300_000,
    color: "#cfc",
  },
];

const chartData = adminBudgetData.map((item) => ({
  name: item.title.length > 10 ? item.title.slice(0, 10) + "…" : item.title,
  amount: item.amount,
  fill: item.color,
}));

const BudgetChartBox = () => {
  return (
    <ChartBox>
      <ChartTitleWithIcon>
        <img src={moneyIcon} alt="money" />
        <ChartSub>
          <span>Q. 어디에 가장 많이 쓰였을까?</span>
          서울시 예산의 흐름을 지금 확인해보세요.
        </ChartSub>
      </ChartTitleWithIcon>
      <ChartArea>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 10, bottom: 30 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => `₩${Number(value).toLocaleString()}`}
            />
            <Bar dataKey="amount">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartArea>
    </ChartBox>
  );
};

export default BudgetChartBox;

const ChartBox = styled.div`
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

const ChartTitleWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }
`;

const ChartSub = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  span {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

const ChartArea = styled.div`
  width: 100%;
  height: 250px;
`;
