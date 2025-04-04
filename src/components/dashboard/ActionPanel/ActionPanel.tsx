import { LeftOutlined, RollbackOutlined, StarFilled } from "@ant-design/icons";
import { Button, Divider, Space, Tooltip } from "antd";
import React, { useState } from "react";

import DashBoardIcon from "@/assets/dashboard/dashboard-icon.svg";
// import useChartStore from "@/stores/useChartStore";

const prefixCls = "action-panel";

interface ActionPanelProps {
  style?: React.CSSProperties;
}

/** 仪表板操作栏 */
const ActionPanel: React.FC<ActionPanelProps> = (props) => {
  const { style } = props;
  // 暂时不支持redo和undo
  // const undo = useChartStore((state) => state.undo);
  // const redo = useChartStore((state) => state.redo);
  // const history = useChartStore((state) => state.history);
  // const redoStack = useChartStore((state) => state.redoStack);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={`${prefixCls}-container`} style={{ ...style }}>
      <div className={`${prefixCls}-left`}>
        <div className="back-button">
          <Tooltip title="返回">
            <Button type="text" icon={<LeftOutlined />} size="small" />
          </Tooltip>
        </div>
        <img src={DashBoardIcon} alt="" width={24} height={24} />
        <div className="dashboard-info">
          <div className="dashboard-title">未命名</div>
          <div className="dashboard-state">仪表板未保存</div>
        </div>
        <Tooltip title={isFavorite ? "取消收藏" : "收藏"}>
          <Button
            type="text"
            icon={
              <StarFilled style={{ color: isFavorite ? "orange" : "gray" }} />
            }
            size="small"
            onClick={toggleFavorite}
          />
        </Tooltip>
      </div>
      <div className={`${prefixCls}-middle`}>
        <Divider
          type="vertical"
          style={{ borderWidth: "2px", height: "30px" }}
        />
        <Space>
          <Tooltip placement="bottom" title="Ctrl / Cmd  +  Z">
            <Button
              type="text"
              size="small"
              icon={<RollbackOutlined />}
              onClick={() => {
                // undo();
                console.log("系统稍后会支持撤销功能");
              }}
              disabled={history.length <= 1}
            >
              撤销
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" title="Ctrl / Cmd + Shift + Z">
            <Button
              type="text"
              size="small"
              icon={<RollbackOutlined style={{ transform: "scaleX(-1)" }} />}
              iconPosition="end"
              onClick={() => {
                // redo();
                console.log("系统稍后会支持重做功能");
              }}
              // disabled={redoStack.length === 0}
            >
              重做
            </Button>
          </Tooltip>
        </Space>
        <Divider
          type="vertical"
          style={{ borderWidth: "2px", height: "30px" }}
        />
      </div>
      <div className={`${prefixCls}-right`}>
        <Space>
          <Button style={{ borderColor: "#1890FF", color: "#1890FF" }}>
            预览
          </Button>
          <Button style={{ borderColor: "#1890FF", color: "#1890FF" }}>
            保存
          </Button>
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </div>
  );
};

export default ActionPanel;
