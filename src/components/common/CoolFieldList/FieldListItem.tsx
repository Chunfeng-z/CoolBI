import { CaretRightOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
const { Text } = Typography;
const prefixCls = "cool-field-list-item";
interface IFieldListItemProps {
  className: string;
  onItemClick: () => void;
  onItemDrag: () => void;
  itemLevel: number;
  hasChildren: boolean;
  isExpanded: boolean;
  icon: React.ReactNode;
  title: string;
}

const FieldListItem: React.FC<IFieldListItemProps> = (props) => {
  const {
    className,
    onItemClick,
    onItemDrag,
    itemLevel,
    hasChildren,
    isExpanded,
    icon,
    title,
  } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [, drag] = useDrag({
    type: "field",
    item: {
      field: title,
    },
  });
  useEffect(() => {
    drag(ref);
  }, []);
  return (
    // tooltip在移出后销毁避免列表项过多导致创建过多tooltip
    <Tooltip title={title} placement="left" destroyTooltipOnHide>
      <div
        className={classNames(prefixCls, className)}
        onClick={onItemClick}
        onDragStart={onItemDrag}
        style={{
          paddingLeft: `${(itemLevel || 0) * 10 + 2}px`,
        }}
        ref={ref}
      >
        <div
          className={classNames("list-switcher", {
            "is-show": hasChildren,
          })}
        >
          <CaretRightOutlined rotate={isExpanded ? 90 : 0} />
        </div>
        <span className="field-icon">{icon}</span>
        <Text ellipsis style={{ marginLeft: 5 }}>
          {title}
        </Text>
      </div>
    </Tooltip>
  );
};

export default FieldListItem;
