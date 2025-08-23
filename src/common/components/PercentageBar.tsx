import styled from "styled-components";

const PercentageBarContainer = styled.div`
  border: 1px solid var(--mui-palette-divider, rgba(0, 0, 0, 0.12));
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 26px;
  border-radius: 2px;
  cursor: pointer;
`;

const PercentageBarBackground = styled.div<{ percent: number, bgColor: string }>`
  background-color:  ${props => props.bgColor};
  width: ${props => props.percent}%;
  height: 100%;
`;

const PercentageBarContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  line-height: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export interface PercentageBarProps {
  percentage: number;
  onClick?: () => void;
}

export default function PercentageBar(props: PercentageBarProps) {
  const percentage = Number.parseFloat(Number(props.percentage).toFixed(2));
  const bgColor = percentage > 50 ? 'green' : percentage > 20 ? 'orange' : 'red';

  return (
    <PercentageBarContainer onClick={props.onClick}>
      <PercentageBarBackground percent={percentage} bgColor={bgColor} />
      <PercentageBarContent>
        {percentage}%
      </PercentageBarContent>
    </PercentageBarContainer>
  );
}
