import { CopyOutlined, DesktopOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Space, Table, TableProps, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

import { getUserDashboardTableData } from "@/api/workbench";
import {
  DashBoardTableDataType,
  DashBoardTableDataKeys,
  DashBoardTableActions,
} from "@/types/workbench";

const prefixCls = "dashboard-table";

/** 表格表头配置 */
const columns: TableProps<DashBoardTableDataType>["columns"] = [
  {
    title: "名称",
    width: "30%",
    dataIndex: DashBoardTableDataKeys.Name,
    key: DashBoardTableDataKeys.Name,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "类型",
    width: 150,
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
    width: 150,
    dataIndex: DashBoardTableDataKeys.BelongSpace,
    key: DashBoardTableDataKeys.BelongSpace,
  },
  {
    title: "最后编辑时间",
    width: 150,
    dataIndex: DashBoardTableDataKeys.LastEdited,
    key: DashBoardTableDataKeys.LastEdited,
  },
  {
    title: "操作",
    width: 100,
    key: DashBoardTableDataKeys.Actions,
    render: (_, record) => (
      <Space size="small">
        {record.actions.map((action) => {
          switch (action.action) {
            case DashBoardTableActions.NewWindow:
              return (
                <div className="action-group-item" key={action.action}>
                  <Tooltip title={action.name}>
                    <Button
                      type="text"
                      size="small"
                      icon={<DesktopOutlined />}
                    />
                  </Tooltip>
                </div>
              );
            case DashBoardTableActions.CopyLink:
              return (
                <div className="action-group-item" key={action.action}>
                  <Tooltip title={action.name}>
                    <Button type="text" size="small" icon={<CopyOutlined />} />
                  </Tooltip>
                </div>
              );
            case DashBoardTableActions.Collect:
              return (
                <div className="action-group-item" key={action.action}>
                  <Tooltip title={action.name}>
                    <Button type="text" size="small" icon={<StarOutlined />} />
                  </Tooltip>
                </div>
              );
          }
        })}
      </Space>
    ),
  },
];

/** 仪表板的展示表格-最近编辑-我创建的-我收藏的 */
const DashboardTable: React.FC = () => {
  // 分页大小控制
  const [pageSize, setPageSize] = useState<number>(10);
  // 总共的数据量
  const [totalPage, setTotalPage] = useState<number>();
  // 图表数据
  const [tableData, setTableData] = useState<DashBoardTableDataType[]>();

  useEffect(() => {
    const getData = async () => {
      const data = await getUserDashboardTableData({
        userId: "1",
        pageNum: 1,
        pageSize: pageSize,
      });
      const respData: DashBoardTableDataType[] = data.data;
      setTableData(respData);
      setTotalPage(respData.length);
    };
    getData();
  }, []);
  return (
    <div className={`${prefixCls}-container`}>
      <Table<DashBoardTableDataType>
        size="small"
        columns={columns}
        pagination={{
          position: ["bottomRight"],
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 30],
          defaultCurrent: 1,
          total: totalPage,
          onChange: (_page, pageSize) => {
            setPageSize(pageSize || 10);
          },
        }}
        dataSource={tableData}
      />
    </div>
  );
};

export default DashboardTable;
