import {
  BoldOutlined,
  DownSquareOutlined,
  ItalicOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  Flex,
  InputNumber,
  Radio,
  Tooltip,
} from "antd";
import React, { useState } from "react";
const prefixCls = "chart-legend";
/** 图例方位 */
enum LegendPosition {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
}
const directions = [
  {
    position: LegendPosition.top,
    icon: <UpSquareOutlined />,
    tooltip: "顶部",
  },
  {
    position: LegendPosition.bottom,
    icon: <DownSquareOutlined />,
    tooltip: "底部",
  },
  {
    position: LegendPosition.left,
    icon: <LeftSquareOutlined />,
    tooltip: "左侧",
  },
  {
    position: LegendPosition.right,
    icon: <RightSquareOutlined />,
    tooltip: "右侧",
  },
];
/** 图例 */
const ChartLegend: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<LegendPosition>(
    LegendPosition.top
  );
  const [selectedOption, setSelectedOption] = useState<string>("");
  const handlePositionSelect = (position: LegendPosition) => {
    setSelectedPosition(position);
    // Default to "left" for top/bottom
    if (position === LegendPosition.top || position === LegendPosition.bottom) {
      setSelectedOption("left");
    } else if (
      position === LegendPosition.left ||
      position === LegendPosition.right
    ) {
      setSelectedOption("bottom");
    }
  };

  const renderRadioOptions = () => {
    if (
      selectedPosition === LegendPosition.top ||
      selectedPosition === LegendPosition.bottom
    ) {
      return (
        <>
          <Radio.Button value="left">居左</Radio.Button>
          <Radio.Button value="center">居中</Radio.Button>
          <Radio.Button value="right">居右</Radio.Button>
        </>
      );
    }

    if (
      selectedPosition === LegendPosition.left ||
      selectedPosition === LegendPosition.right
    ) {
      return (
        <>
          <Radio.Button value="top">顶部</Radio.Button>
          <Radio.Button value="middle">居中</Radio.Button>
          <Radio.Button value="bottom">底部</Radio.Button>
        </>
      );
    }
    return null;
  };
  return (
    <div className={`${prefixCls}-container`}>
      <Flex style={{ height: 32 }} align="center">
        <Checkbox>显示图例</Checkbox>
      </Flex>
      <Flex style={{ height: 32 }} align="center" gap="small">
        <span>位置</span>
        {directions.map(({ position, icon, tooltip }) => (
          <Tooltip key={position} title={tooltip}>
            <Button
              type="text"
              size="small"
              icon={icon}
              style={{
                backgroundColor:
                  selectedPosition === position ? "#F5F5F5" : undefined,
              }}
              onClick={() => handlePositionSelect(position)}
            />
          </Tooltip>
        ))}
      </Flex>
      {selectedPosition && (
        <Flex style={{ marginLeft: 25, height: 32 }} align="center">
          <Radio.Group
            value={selectedOption}
            size="small"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {renderRadioOptions()}
          </Radio.Group>
        </Flex>
      )}
      <Flex style={{ height: 32 }} align="center" gap="small">
        <span style={{ whiteSpace: "nowrap" }}>文本</span>
        <ColorPicker size="small" />
        <InputNumber
          size="small"
          addonAfter="px"
          min={0}
          max={20}
          defaultValue={12}
          step={1}
          changeOnWheel
          style={{ width: 100 }}
        />
        <Tooltip title="加粗">
          <Button type="text" icon={<BoldOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="斜体">
          <Button type="text" icon={<ItalicOutlined />} size="small" />
        </Tooltip>
      </Flex>
    </div>
  );
};

export default ChartLegend;
