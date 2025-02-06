import { Space, Table, TableProps, Tag } from "antd";
import React from "react";
import { DashBoardTableDataType, DashBoardTableDataKeys } from "../utils/index";
import { dashboardTableEditData } from "../test";
const prefixCls = "dashboard-table";

/** 表格表头配置 */
const columns: TableProps<DashBoardTableDataType>["columns"] = [
  {
    title: "名称",
    dataIndex: DashBoardTableDataKeys.Name,
    key: DashBoardTableDataKeys.Name,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "类型",
    dataIndex: DashBoardTableDataKeys.Kind,
    key: DashBoardTableDataKeys.Kind,
  },
  {
    title: "创建者",
    dataIndex: DashBoardTableDataKeys.Creator,
    key: DashBoardTableDataKeys.Creator,
  },
  {
    title: "所属空间",
    dataIndex: DashBoardTableDataKeys.BelongSpace,
    key: DashBoardTableDataKeys.BelongSpace,
  },
  {
    title: "最后编辑时间",
    dataIndex: DashBoardTableDataKeys.LastEdited,
    key: DashBoardTableDataKeys.LastEdited,
  },
  {
    title: "操作",
    key: DashBoardTableDataKeys.Actions,
    render: (_, record) => (
      <Space size="small">
        {record.actions.map((action) => (
          <Tag key={action.action}>{action.name}</Tag>
        ))}
      </Space>
    ),
  },
];

/** 仪表板的展示表格-最近编辑-我创建的-我收藏的 */
const DashboardTable: React.FC = () => {
  return (
    <div className={`${prefixCls}-container`}>
      <Table<DashBoardTableDataType>
        size="middle"
        columns={columns}
        dataSource={dashboardTableEditData}
      />
    </div>
  );
};

export default DashboardTable;
