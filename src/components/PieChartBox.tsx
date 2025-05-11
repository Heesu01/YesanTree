import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import moneyIcon from "../assets/money.png";
import { fetchTop5ByField } from "../api/BudgetApi";
import type { FieldTop5BudgetItem } from "../api/BudgetApi";

const COLORS = ["#6dad5b", "#fbb13c", "#53b3cb", "#c94c4c", "#8a79af"];

const PieChartBox = () => {
  const [data, setData] = useState<FieldTop5BudgetItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchTop5ByField();
        setData(result);
      } catch (err) {
        console.error("분야별 상위 예산 데이터를 불러오지 못했습니다.", err);
      }
    };
    load();
  }, []);

  const formatToShortUnit = (value: number) => {
    if (value >= 1_0000_0000_0000) {
      return `${(value / 1_0000_0000_0000).toFixed(1)}조`;
    } else if (value >= 1_0000_0000) {
      return `${(value / 1_0000_0000).toFixed(1)}억`;
    }
    return value.toLocaleString();
  };

  const chartData = data.map((item) => ({
    name: item.deptName,
    value: Number(item.value.replace(/,/g, "")),
  }));

  return (
    <ChartContainer>
      <ChartTitleWithIcon>
        <img src={moneyIcon} alt="money" />
        <ChartSub>
          <span>Q. 예산이 가장 많이 사용된 분야는 어디일까요?</span>
          분야별 상위 5개 예산을 확인해보세요.
        </ChartSub>
      </ChartTitleWithIcon>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, value }) => `${name} (${formatToShortUnit(value)})`}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `₩ ${(value as number).toLocaleString()}`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default PieChartBox;

const ChartContainer = styled.div`
  padding: 24px;
  border-radius: 16px;
  background-color: #fff;
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
