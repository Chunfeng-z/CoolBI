import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Dropdown,
  Flex,
  Input,
  MenuProps,
  message,
  Segmented,
  Space,
} from "antd";
import React, { useState } from "react";
import { DropdownItems } from "../utils/index";

const prefixCls = "quick-action-bar";

// 下拉菜单内容
const items: MenuProps["items"] = [
  {
    key: "all_kinds",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        {DropdownItems.all_kinds}
      </a>
    ),
  },
  {
    type: "divider",
  },
  {
    key: "recently_edited",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        {DropdownItems.recently_edited}
      </a>
    ),
  },
  {
    key: "i_created",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        {DropdownItems.i_created}
      </a>
    ),
  },
  {
    key: "i_collected",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        {DropdownItems.i_collected}
      </a>
    ),
  },
];

/** 仪表板分类&检索操作栏 */
const QuickActionsBar: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  //   选中展示内容后前端展示效果
  const [menuLabel, setMenuLabel] = useState<DropdownItems>(
    DropdownItems.all_kinds
  );
  // 仪表板的分段类型
  const segments = [
    { label: "最近编辑", value: "1" },
    {
      label: "我创建的",
      value: "2",
    },
    {
      label: "我收藏的",
      value: "3",
    },
  ];
  // 下拉菜单的点击事件
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const dropdownItem = DropdownItems[e.key as keyof typeof DropdownItems];
    messageApi.info(`当前检索范围:${dropdownItem}`);
    // 设置选中的展示内容
    setMenuLabel(dropdownItem);
  };
  return (
    <>
      {contextHolder}
      <div className={`${prefixCls}-container`}>
        <Flex justify="space-between">
          <div className={`${prefixCls}-nav`}>
            <Segmented options={segments}></Segmented>
          </div>
          <div className={`${prefixCls}-extra-content`}>
            <Space size="middle">
              <Input prefix={<SearchOutlined />}></Input>
              <Dropdown
                menu={{
                  items,
                  selectable: true,
                  defaultSelectedKeys: ["0"],
                  onClick: handleMenuClick,
                }}
                placement="bottom"
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {menuLabel}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Space>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default QuickActionsBar;
