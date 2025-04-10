import { ReactNode } from "react";

export interface CoolListNode {
  key: string;
  title: string;
  icon: ReactNode;
  children?: CoolListNode[];
  parentKey?: string; // 用于标识父节点
  level?: number; // 用于标识层级
}
