import { BoldOutlined, ItalicOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  InputNumber,
  Select,
  Tooltip,
} from "antd";
import { Color } from "antd/es/color-picker";
import React, { useEffect, useState } from "react";

const prefixCls = "data-label";
/** label的位置配置 */
const positionOptions = [
  { value: "auto", label: "自动" },
  { value: "top", label: "顶部" },
  { value: "bottom", label: "底部" },
  { value: "inside", label: "内部" },
  { value: "outside", label: "外部" },
];

/**
 * 图表配置-数据标签
 */
interface DataLabelProps {
  onChange?: (values: DataLabelValues) => void;
  defaultValues?: Partial<DataLabelValues>;
}

/** 数据标签配置值 */
export interface DataLabelValues {
  showAll: boolean;
  position: string;
  color: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
}

const DataLabel: React.FC<DataLabelProps> = (props) => {
  const { onChange, defaultValues = {} } = props;
  // 状态管理
  const [values, setValues] = useState<DataLabelValues>({
    showAll: defaultValues.showAll || false,
    position: defaultValues.position || "auto",
    color: defaultValues.color || "#000000",
    fontSize: defaultValues.fontSize || 12,
    bold: defaultValues.bold || false,
    italic: defaultValues.italic || false,
  });

  // 统一更新状态的函数
  const updateValues = (newValues: Partial<DataLabelValues>) => {
    const updatedValues = { ...values, ...newValues };
    setValues(updatedValues);
    onChange?.(updatedValues);
  };

  // 当状态变更时触发回调
  useEffect(() => {
    onChange?.(values);
  }, []);

  return (
    <div className={`${prefixCls}-container`}>
      <div className="data-label-text-simple">
        <Checkbox
          checked={values.showAll}
          onChange={(e) => updateValues({ showAll: e.target.checked })}
        >
          全量显示
        </Checkbox>
      </div>
      <div className="data-label-text">
        <span>位置</span>
        <Select
          size="small"
          placement="bottomRight"
          value={values.position}
          style={{ width: 160 }}
          options={positionOptions}
          onChange={(value) => updateValues({ position: value })}
        />
      </div>
      <div className="data-label-text">
        <span>文本</span>
        <ColorPicker
          size="small"
          value={values.color}
          onChange={(color: Color) =>
            updateValues({ color: color.toHexString() })
          }
        />
        <InputNumber
          size="small"
          addonAfter="px"
          min={0}
          max={20}
          value={values.fontSize}
          step={1}
          changeOnWheel
          style={{ width: 100 }}
          onChange={(value) => updateValues({ fontSize: value as number })}
        />
        <Tooltip title="加粗">
          <Button
            type={values.bold ? "primary" : "text"}
            icon={<BoldOutlined />}
            size="small"
            onClick={() => updateValues({ bold: !values.bold })}
          />
        </Tooltip>
        <Tooltip title="斜体">
          <Button
            type={values.italic ? "primary" : "text"}
            icon={<ItalicOutlined />}
            size="small"
            onClick={() => updateValues({ italic: !values.italic })}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default DataLabel;
