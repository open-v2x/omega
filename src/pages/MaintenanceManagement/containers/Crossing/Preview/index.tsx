import React, { useEffect, useState } from 'react';
import BaseContainer from '#/components/BaseContainer';
import { ProCard } from '@ant-design/pro-components';
import { Stage, Layer, Rect, Line, Group } from 'react-konva';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.less';
import { getBitData } from '#/services/api/config/crossing';

const canvasWidth = window.innerWidth - 256 - 40;
const canvasHeight = window.innerHeight - 52 - 72 - 40;
const halfWidth = canvasWidth / 2;
const halfHeight = canvasHeight / 2;

type LineMapProps = {
  laneWidth: any[];
  laneNumber: number;
  type?: string;
  horizontal: boolean;
};
type LaneMapProps = {
  laneWidths: number[][];
  laneNumbers: number[];
};

// type DirectionProps = {
//   isLeft: boolean;
//   isRight: boolean;
//   width: number;
//   type: string;
// };

const LaneLayer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layer x={halfWidth} y={halfHeight} offset={{ x: halfWidth, y: halfHeight }}>
    {children}
  </Layer>
);

// const DrawDirectionMap: React.FC<DirectionProps> = ({ isLeft, isRight, width, type }) => {
//   let points = [];
//   if (type === 'west') {
//     console.log('西边的线', width);
//     points = [
//       // halfWidth / 2 + 60,
//       // width - 10,
//       halfWidth / 2 + 25,
//       width,
//       halfWidth / 2 + 50,
//       width,
//       halfWidth / 2 + 60,
//       width - 10,
//       halfWidth / 2 + 55,
//       width - 5,
//     ];
//   }
//   return <Line points={points} stroke="red" strokeWidth={1} />;
// };

const LineMap: React.FC<LineMapProps> = ({ laneWidth, type, horizontal }) => {
  const startWidth = Number(laneWidth?.[0]);
  const lanes = laneWidth?.slice(1, -1);
  let totalWidth = 0;
  return (
    <>
      {lanes?.map(lane => {
        const width = Number(lane.laneWidth) * 2;
        // 画地标的宽度占据总的一半
        totalWidth = totalWidth + width;
        // const flagWidth = -startWidth + totalWidth - width / 2;
        // const isLeft = Boolean(Number(lane.maneuvers[1]));
        // const isRight = Boolean(Number(lane.maneuvers[2]));
        // 第6位表示是否可以向外侧变道
        const laneIsChange = Boolean(Number(lane.maneuvers[6]));
        const offset = -startWidth + totalWidth;
        return (
          <>
            <Line
              key={`${type}_${lane.laneID}`}
              points={horizontal ? [0, offset, halfWidth, offset] : [offset, 0, offset, halfHeight]}
              dash={laneIsChange ? [20, 20] : []}
              stroke="#566B85"
              strokeWidth={2}
            />
            {/* <DrawDirectionMap isLeft={isLeft} isRight={isRight} width={flagWidth} type={type} /> */}
          </>
        );
      })}
    </>
  );
};

const RectMap: React.FC<any> = props => <Rect {...props} />;

const LaneMap: React.FC<LaneMapProps> = ({ laneNumbers, laneWidths }) => {
  const rectProps = (index: number, type: boolean = false) => {
    // 总宽度
    const width = laneWidths[index]?.[0];
    return {
      x: type ? -width : 0,
      y: type ? 0 : -width,
      width: type ? width * 2 : halfWidth,
      height: type ? halfHeight : width * 2,
      fill: '#2C364E',
    };
  };
  const lineProps = (index: number) => ({
    laneNumber: laneNumbers[index],
    laneWidth: laneWidths[index],
  });
  const groupMap = [
    {
      key: 'top',
      x: halfWidth,
      y: 0,
      rect: rectProps(0, true),
      line: { horizontal: false, ...lineProps(0), key: 'north' },
    },
    {
      key: 'bottom',
      x: halfWidth,
      y: halfHeight,
      rect: rectProps(2, true),
      line: { horizontal: false, ...lineProps(2), key: 'south' },
    },
    {
      key: 'right',
      x: halfWidth,
      y: halfHeight,
      rect: rectProps(1),
      line: { horizontal: true, ...lineProps(1), type: 'east' },
    },
    {
      key: 'left',
      x: 0,
      y: halfHeight,
      rect: rectProps(3),
      line: { horizontal: true, ...lineProps(3), type: 'west' },
    },
  ];

  return (
    <LaneLayer>
      {groupMap.map(({ key, x, y, rect, line }) => (
        <Group key={key} x={x} y={y}>
          <RectMap {...rect} />
          <LineMap {...line} />
        </Group>
      ))}
      <RectMap
        x={halfWidth - laneWidths[0]?.[0] + 1}
        y={halfHeight - laneWidths[1]?.[0] - 2}
        width={laneWidths[0]?.[0] * 2 - 2}
        height={laneWidths[1]?.[0] * 2 + 2}
        fill="#2C364E"
      />
    </LaneLayer>
  );
};

const CrossingPreview: React.FC = () => {
  const naviagte = useNavigate();
  const params = useParams();
  const [data, setData] = useState<any>();

  if (!params.id) {
    naviagte(-1);
  }

  const fetchMapConfig = async () => {
    const result = await getBitData(+params.id);
    setData(result?.nodes);
  };

  useEffect(() => {
    fetchMapConfig();
  }, []);

  // 车道数量
  const laneNumbers: number[] = [];
  // 车道宽度, 0123分别表示北东南西
  const laneWidths: number[][] = [];
  /**
   * @description:
   * @params linkWidth 车道总宽度
   * @return {*}
   */
  data?.Node?.map(n => {
    n.inLinks?.Link.map(({ linkWidth, lanes }: { linkWidth: number; lanes: {} }, index) => {
      const laneList = lanes?.Lane || [];
      const multiple = 10;
      laneNumbers.push(laneList.length);
      const widths = laneList.map(l => {
        const width = Math.floor(Number(l.laneWidth) / multiple);
        return {
          ...l,
          laneWidth: width,
        };
      });
      // 第一位放置总宽度, 后面放所有的数据
      laneWidths[index] = [Math.floor(Number(linkWidth) / multiple), ...widths];
    });
  });

  return (
    <BaseContainer back>
      <ProCard className={styles.preview}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <LaneMap laneNumbers={laneNumbers} laneWidths={laneWidths} />
        </Stage>
      </ProCard>
    </BaseContainer>
  );
};

export default CrossingPreview;
