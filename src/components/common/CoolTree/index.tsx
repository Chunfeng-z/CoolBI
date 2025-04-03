import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Tree, TreeDataNode, TreeProps, Input } from "antd";
import React, { useState, useEffect } from "react";
import "./index.scss";

const { Search } = Input;
const prefixCls = "cool-tree";
const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

interface CoolTreeProps {
  /** 树数据 */
  treeData?: TreeDataNode[];
  /** 是否显示搜索框 */
  showSearch?: boolean;
}

/** 自定义的树形组件 */
const CoolTree: React.FC<CoolTreeProps> = (props) => {
  const { treeData: propTreeData = treeData, showSearch = true } = props;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 初始化时或树数据变化时，获取所有节点的 keys 用于默认展开
  useEffect(() => {
    if (!isSearching) {
      const allKeys: React.Key[] = [];
      const getAllKeys = (nodes: TreeDataNode[]) => {
        nodes.forEach((node) => {
          if (node.key) {
            allKeys.push(node.key);
          }
          if (node.children && node.children.length > 0) {
            getAllKeys(node.children);
          }
        });
      };

      getAllKeys(propTreeData);
      setExpandedKeys(allKeys);
    }
  }, [propTreeData, isSearching]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  // 从任何类型的标题中提取文本内容
  const getNodeText = (node: React.ReactNode): string => {
    if (typeof node === "string") {
      return node;
    }
    if (React.isValidElement(node)) {
      const children = node.props.children;
      if (typeof children === "string") {
        return children;
      }
      if (Array.isArray(children)) {
        return children.map(getNodeText).join("");
      }
      return getNodeText(children);
    }
    return String(node || "");
  };

  // 处理展开/折叠节点
  const toggleExpand = (e: React.MouseEvent, key: React.Key) => {
    e.stopPropagation(); // 阻止事件冒泡，防止触发选中

    const newExpandedKeys = expandedKeys.includes(key)
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key];

    setExpandedKeys(newExpandedKeys);
  };

  const handleSearch = (value: string) => {
    if (!value) {
      setIsSearching(false);
      setSearchValue("");
      return;
    }

    setIsSearching(true);
    const newExpandedKeys: React.Key[] = [];

    const searchTreeData = (
      data: TreeDataNode[],
      parentKeys: React.Key[] = []
    ): void => {
      data.forEach((item) => {
        const titleText = getNodeText(item.title);
        const currentKeys = [...parentKeys];

        if (item.key) {
          currentKeys.push(item.key);
        }

        if (titleText.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          // 添加父节点keys以确保路径可见
          newExpandedKeys.push(...currentKeys);
        }

        if (item.children) {
          searchTreeData(item.children, currentKeys);
        }
      });
    };

    searchTreeData(propTreeData);

    setSearchValue(value);
    setExpandedKeys([...new Set(newExpandedKeys)]);
  };

  const titleRender = (node: TreeDataNode) => {
    const titleText = getNodeText(node.title);
    const isExpanded = node.key ? expandedKeys.includes(node.key) : false;
    const hasChildren = node.children && node.children.length > 0;

    // 构建展开/折叠图标
    const expandIcon = hasChildren ? (
      <span
        onClick={(e) => toggleExpand(e, node.key as React.Key)}
        style={{
          marginRight: 8,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {isExpanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
      </span>
    ) : (
      <span
        style={{ marginRight: 8, width: 14, display: "inline-block" }}
      ></span>
    );

    // 处理搜索高亮显示
    let titleContent;
    if (
      searchValue &&
      titleText.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    ) {
      const index = titleText.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = titleText.substring(0, index);
      const matchStr = titleText.substring(index, index + searchValue.length);
      const afterStr = titleText.substring(index + searchValue.length);

      titleContent = (
        <span>
          {beforeStr}
          <span style={{ color: "#f50", fontWeight: "bold" }}>{matchStr}</span>
          {afterStr}
        </span>
      );
    } else {
      titleContent = node.title;
    }

    return (
      <span>
        {expandIcon}
        {titleContent}
      </span>
    );
  };

  return (
    <div className={prefixCls}>
      {showSearch && (
        <div className={`${prefixCls}-search`} style={{ marginBottom: 8 }}>
          <Search
            size="small"
            placeholder="请输入搜索内容"
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
          />
        </div>
      )}
      <Tree
        blockNode={true}
        autoExpandParent={true}
        onSelect={onSelect}
        onCheck={onCheck}
        expandedKeys={expandedKeys}
        onExpand={setExpandedKeys}
        treeData={propTreeData}
        titleRender={titleRender}
        showLine={false}
        switcherIcon={<span style={{ display: "none" }}></span>}
      />
    </div>
  );
};

export default CoolTree;
