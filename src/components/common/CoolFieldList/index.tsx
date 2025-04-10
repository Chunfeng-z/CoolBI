import { useKeyPress } from "ahooks";
import { List } from "antd";
import { findLastIndex } from "lodash-es";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import FieldListItem from "./FieldListItem";
import { data as originListData } from "./test";

import { CoolListNode } from "@/types/commonComp";
import { flattenListData } from "@/utils/hooks";

import "./index.scss";
const prefixCls = "cool-field-list";

interface CoolFieldListProps {
  /** 字段的嵌套数据 */
  dataSource?: Pick<CoolListNode, "key" | "title" | "icon" | "children">[];
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 搜索字段 */
  searchValue?: string;
}

/** 字段列表 */
const CoolFieldList: React.FC<CoolFieldListProps> = (props) => {
  const {
    dataSource = originListData,
    defaultExpandAll = true,
    searchValue,
  } = props;
  /** 显示的列表数据 */
  const [displayData, setDisplayData] = useState<CoolListNode[]>([]);
  /** 节点的展开集合 */
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  /** 点击选中的节点 */
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  /** 是否按下了 Command 键 */
  const [cmdPressed, setCmdPressed] = useState<boolean>(false);
  /** 是否按下shift键 */
  const [shiftPressed, setShiftPressed] = useState<boolean>(false);
  useKeyPress(
    ["meta"],
    () => {
      setCmdPressed(true);
    },
    { events: ["keydown"] }
  );
  useKeyPress(
    ["meta"],
    () => {
      setCmdPressed(false);
    },
    { events: ["keyup"] }
  );
  useKeyPress(
    ["shift"],
    () => {
      setShiftPressed(true);
    },
    { events: ["keydown"] }
  );
  useKeyPress(
    ["shift"],
    () => {
      setShiftPressed(false);
    },
    { events: ["keyup"] }
  );
  const flattenedData = useMemo(
    () => flattenListData(dataSource),
    [dataSource]
  );

  useEffect(() => {
    /** 是否展开全部节点 */
    setDisplayData(
      defaultExpandAll
        ? flattenedData
        : flattenedData.filter((item) => !item.parentKey)
    );
  }, [defaultExpandAll, flattenedData]);

  /** 折叠状态切换 */
  const handleToggle = useCallback(
    (key: string) => {
      const newExpandedKeys = new Set(expandedKeys);
      if (newExpandedKeys.has(key)) {
        newExpandedKeys.delete(key);
      } else {
        newExpandedKeys.add(key);
      }
      setExpandedKeys(newExpandedKeys);
      // 第一层的所有节点直接展示，父节点展开的所有子节点
      const filteredData = flattenedData.filter((item) => {
        return !item.parentKey || newExpandedKeys.has(item.parentKey);
      });
      setDisplayData(filteredData);
    },
    [expandedKeys, flattenedData]
  );

  /** 点击选中节点 */
  const handleSelect = useCallback(
    (key: string) => {
      const newSelectedKeys = new Set(selectedKeys);
      // 如果按下了 Command 键，实现多选
      if (cmdPressed) {
        if (newSelectedKeys.has(key)) {
          newSelectedKeys.delete(key);
        } else {
          newSelectedKeys.add(key);
        }
      } else if (shiftPressed) {
        // 如果按下了 Shift 键，选择范围内的所有节点
        const index = flattenedData.findIndex((item) => item.key === key);
        // flattenedData 是有序的，所以返回的是下标最小的选中的项
        let startIndex = flattenedData.findIndex((item) =>
          newSelectedKeys.has(item.key)
        );
        // 下标最大的选中的项
        let endIndex = findLastIndex(flattenedData, (item) =>
          newSelectedKeys.has(item.key)
        );
        if (index <= startIndex) {
          const temp = startIndex;
          startIndex = index;
          endIndex = temp;
        } else if (index >= endIndex) {
          const temp = endIndex;
          endIndex = index;
          startIndex = temp;
        } else {
          // 在中间取上部分
          endIndex = index;
        }
        // 全部清空重新添加
        newSelectedKeys.clear();

        for (let i = startIndex; i <= endIndex; i++) {
          const hasChildren = flattenedData.some(
            (child) => flattenedData[i].key === child.parentKey
          );
          if (!hasChildren) {
            newSelectedKeys.add(flattenedData[i].key);
          }
        }
      } else {
        // 单选，始终选择最新的字段
        newSelectedKeys.clear();
        newSelectedKeys.add(key);
      }
      setSelectedKeys(newSelectedKeys);
    },
    [selectedKeys, cmdPressed, shiftPressed, flattenedData]
  );

  /** 搜索值改变的时候更新displayData */
  useEffect(() => {
    // 如果没有搜索值，则显示所有数据
    if (searchValue) {
      const filteredData = flattenedData.filter((item) => {
        return item.title.includes(searchValue);
      });
      setDisplayData(filteredData);
    }
  }, [flattenedData, searchValue]);

  return (
    <div className={prefixCls}>
      <List
        size="small"
        bordered
        dataSource={displayData}
        renderItem={(item: CoolListNode) => {
          // 当前节点是否存在子节点
          const hasChildren = flattenedData.some(
            (child) => item.key === child.parentKey
          );
          const isExpanded = expandedKeys.has(item.key);
          const isSelected = selectedKeys.has(item.key);

          return (
            <FieldListItem
              className={isSelected ? "is-selected" : ""}
              onItemClick={() => {
                if (hasChildren) {
                  handleToggle(item.key);
                } else {
                  handleSelect(item.key);
                }
              }}
              onItemDrag={() => {
                // 拖拽时保持和点击相同的行为
                if (!isSelected) {
                  handleSelect(item.key);
                }
              }}
              itemLevel={item.level || 0}
              hasChildren={hasChildren}
              isExpanded={isExpanded}
              icon={item.icon}
              title={item.title}
            />
          );
        }}
      />
    </div>
  );
};

export default CoolFieldList;
