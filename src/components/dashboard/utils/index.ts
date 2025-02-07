/** 首页-推荐卡片属性 */
export interface RecommendCardProps {
  /** 推荐卡片的id */
  id?: number | string;
  /** 推荐仪表板图像地址 */
  imageUrl: string;
  /** 推荐仪表板标题 */
  title: string;
  /** 推荐仪表板描述 */
  description: string;
  /** 推荐仪表板查看次数 */
  viewsCount: number | string;
  /** 推荐仪表板使用次数 */
  usesCount: number | string;
  /** 推荐仪表板用户来源 */
  source: string;
}

/** 首页-下拉菜单选项 */
export enum DropdownItems {
  "all_kinds" = "全部类型",
  "recently_edited" = "最近编辑",
  "i_created" = "我创建的",
  "i_collected" = "我收藏的",
}

/** 首页-分段的切换选项 */
export enum SegmentedItems {
  "recently_edited" = "recently_edited",
  "i_created" = "i_created",
  "i_collected" = "i_collected",
}

/** 工作台表格数据类型 */
export interface DashBoardTableDataType {
  /** 报表名称 */
  name: string;
  // !TODO 后续确定报表类之后设置为枚举类型
  /** 报表类型-仪表板、数据大屏... */
  kind: string;
  /** 创建者 */
  creator: string;
  /** 所属空间 */
  belongSpace: string;
  /** 最后编辑时间 */
  lastEdited: string;
  /** 可以执行的操作 */
  actions: {
    /** 操作名称 */
    name: string;
    /** 操作类型 */
    action: string;
  }[];
}

// 工作台表格的表头项
export enum DashBoardTableDataKeys {
  Name = "name",
  Kind = "kind",
  Creator = "creator",
  BelongSpace = "belongSpace",
  LastEdited = "lastEdited",
  Actions = "actions",
}
