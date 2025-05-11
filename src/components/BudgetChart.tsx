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
import { useEffect, useState } from "react";
import moneyIcon from "../assets/money.png";
import { fetchTop10Budget } from "../api/BudgetApi";
import type { TopBudgetItem } from "../api/BudgetApi";

const BudgetChartBox = () => {
  const [data, setData] = useState<TopBudgetItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchTop10Budget("SUB_SUM_CURR_AMT");
        setData(result);
      } catch (err) {
        console.error("Top10 예산 데이터를 불러오지 못했습니다.", err);
      }
    };
    load();
  }, []);

  const chartData = data.map((item) => ({
    name:
      item.deptName.length > 6
        ? item.deptName.slice(0, 6) + "…"
        : item.deptName,
    amount: Number(item.value.replace(/,/g, "")),
    fill: "#a0d468",
  }));

  const formatToShortUnit = (value: number) => {
    if (value >= 1_0000_0000_0000)
      return `${(value / 1_0000_0000_0000).toFixed(1)}조`;
    if (value >= 1_0000_0000) return `${(value / 1_0000_0000).toFixed(1)}억`;
    if (value >= 1_0000) return `${(value / 1_0000).toFixed(1)}만`;
    return value.toLocaleString();
  };

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
            <XAxis
              dataKey="name"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis
              width={80}
              tickFormatter={(value) => formatToShortUnit(value)}
            />

            <Tooltip
              formatter={(value: number) => `₩ ${formatToShortUnit(value)}`}
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
  min-height: 250px;
`;
