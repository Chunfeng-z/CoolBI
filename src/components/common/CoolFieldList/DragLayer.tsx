import { theme, Typography } from "antd";
import React, { memo } from "react";
import { useDragLayer } from "react-dnd";

import { CoolListNode } from "@/types/commonComp";
const { Text } = Typography;
const prefixCls = "cool-drag-layer";

interface DragLayerProps {
  /** 当前选中的字段列表 */
  fieldList: CoolListNode[];
}

/** 自定义字段的托拽预览 */
const DragLayer: React.FC<DragLayerProps> = memo((props) => {
  const { fieldList } = props;
  const { token } = theme.useToken();
  const { isDragging, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));
  if (!isDragging) {
    return null;
  }
  return (
    <div className={prefixCls}>
      {fieldList.map((fieldItem, index) => {
        return (
          <div
            className="field-dragging-item"
            key={fieldItem.key}
            style={{
              position: "fixed",
              pointerEvents: "none",
              width: "150px",
              height: "28px",
              border: `1px solid ${token.colorPrimary}`,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              paddingInline: 4,
              backgroundColor: token.colorBgContainer,
              left: currentOffset?.x,
              top: (currentOffset?.y || 0) + index * 30,
            }}
          >
            <span className="field-icon">{fieldItem.icon}</span>
            <Text ellipsis style={{ marginLeft: 5 }}>
              {fieldItem.title}
            </Text>
          </div>
        );
      })}
    </div>
  );
});

export default DragLayer;
