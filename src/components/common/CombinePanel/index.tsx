import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, InputNumber, theme } from "antd";
import { pick } from "lodash-es";
import React, { memo, useState } from "react";
import "./index.scss";

const prefixCls = "combine-panel";

/** 组合控制器所有字段配置 */
interface CardPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
  verticalLocked: boolean;
  horizontalLocked: boolean;
}

/** 组合边距控制器的返回值 */
export type CardPaddingValues = Pick<
  CardPadding,
  "top" | "right" | "bottom" | "left"
>;

const defaultPaddingValues: CardPadding = {
  top: 8,
  right: 8,
  bottom: 8,
  left: 8,
  verticalLocked: false,
  horizontalLocked: false,
};

export interface CombinePanelProps {
  paddingValues?: CardPaddingValues;
  onChange?: (padding: CardPaddingValues) => void;
}

/** 边距调节组合面板 */
const CombinePanel: React.FC<CombinePanelProps> = memo((props) => {
  const { paddingValues, onChange } = props;
  const { token } = theme.useToken();

  /** 卡片内边距状态 */
  const [cardPadding, setCardPadding] = useState<CardPadding>(
    paddingValues
      ? { ...defaultPaddingValues, ...paddingValues }
      : defaultPaddingValues
  );

  /** 处理卡片内边距的变化 */
  const handleCardPaddingChange = (
    position: "top" | "bottom" | "left" | "right",
    value: number | null
  ) => {
    if (value === null) return;
    const newPadding: CardPadding = {
      ...cardPadding,
    };
    // 如果垂直方向锁定，改变任一值会同时改变两个
    if (
      newPadding.verticalLocked &&
      (position === "top" || position === "bottom")
    ) {
      newPadding.top = value;
      newPadding.bottom = value;
    } else if (
      newPadding.horizontalLocked &&
      (position === "left" || position === "right")
    ) {
      // 如果水平方向锁定，改变任一值会同时改变两个
      newPadding.left = value;
      newPadding.right = value;
    } else {
      newPadding[position] = value;
    }
    setCardPadding(newPadding);
    // 触发回调函数,外界获取到最新的padding值
    onChange?.(pick(newPadding, ["top", "right", "bottom", "left"]));
  };

  /** 切换垂直方向锁定状态 */
  const toggleVerticalLock = () => {
    setCardPadding((prev) => {
      return {
        ...prev,
        verticalLocked: !prev.verticalLocked,
      };
    });
  };

  /** 切换水平方向锁定状态 */
  const toggleHorizontalLock = () => {
    setCardPadding((prev) => {
      return {
        ...prev,
        horizontalLocked: !prev.horizontalLocked,
      };
    });
  };

  return (
    <div className={prefixCls}>
      <div className="left-panel">
        <div className="lock-wrapper left-lock-wrapper">
          <Button
            size="small"
            type="text"
            style={{
              zIndex: 1,
              backgroundColor: token.colorBgContainer,
            }}
            icon={
              cardPadding.verticalLocked ? (
                <LockOutlined style={{ fontSize: 16 }} />
              ) : (
                <UnlockOutlined style={{ fontSize: 16 }} />
              )
            }
            onClick={toggleVerticalLock}
          />
          <div className="left-link-line"></div>
        </div>
        <div className="panel-wrapper">
          <InputNumber
            size="small"
            min={0}
            max={20}
            value={cardPadding.top}
            onChange={(value) => handleCardPaddingChange("top", value)}
            style={{ width: 100 }}
            addonBefore="上"
          />
          <InputNumber
            size="small"
            min={0}
            max={20}
            value={cardPadding.bottom}
            onChange={(value) => handleCardPaddingChange("bottom", value)}
            style={{ width: 100 }}
            addonBefore="下"
          />
        </div>
      </div>
      <div className="right-panel">
        <div className="panel-wrapper">
          <InputNumber
            size="small"
            min={0}
            max={20}
            value={cardPadding.left}
            onChange={(value) => handleCardPaddingChange("left", value)}
            style={{ width: 100 }}
            addonBefore="左"
          />
          <InputNumber
            size="small"
            min={0}
            max={20}
            value={cardPadding.right}
            onChange={(value) => handleCardPaddingChange("right", value)}
            style={{ width: 100 }}
            addonBefore="右"
          />
        </div>
        <div className="lock-wrapper right-lock-wrapper">
          <Button
            size="small"
            type="text"
            style={{
              zIndex: 1,
              backgroundColor: token.colorBgContainer,
            }}
            icon={
              cardPadding.horizontalLocked ? (
                <LockOutlined style={{ fontSize: 16 }} />
              ) : (
                <UnlockOutlined style={{ fontSize: 16 }} />
              )
            }
            onClick={toggleHorizontalLock}
          />
          <div className="right-link-line"></div>
        </div>
      </div>
    </div>
  );
});

export default CombinePanel;
