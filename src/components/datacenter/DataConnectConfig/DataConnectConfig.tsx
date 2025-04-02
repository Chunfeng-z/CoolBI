import {
  CalendarOutlined,
  FieldNumberOutlined,
  FieldStringOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Segmented,
  Space,
  Steps,
  Table,
  TableProps,
  Tabs,
  theme,
  Tooltip,
  Upload,
  UploadProps,
  Select,
} from "antd";
import classNames from "classnames";
import React, { useState } from "react";

import "./index.scss";
import UploadConfirmModal from "@/components/common/UploadConfirmModal";
import { useThemeStore } from "@/stores/useThemeStore";
import { ExcelData, useExcelParser, detectDataType } from "@/utils/hooks";
import { FieldType } from "@/utils/type";
const { useToken } = theme;
const prefixCls = "data-connect-config";
const { Dragger } = Upload;
/** 上传样例表格的数据类型 */
interface DataType {
  key: string;
  time: string;
  number: number;
  sale: number;
}

/** 示例表格数据 */
const exampleData: DataType[] = [
  {
    key: "1",
    time: "2025/01/01",
    number: 12,
    sale: 52000,
  },
  {
    key: "2",
    time: "2025/01/02",
    number: 13,
    sale: 40000,
  },
  {
    key: "3",
    time: "2025/01/03",
    number: 14,
    sale: 66000,
  },
];

/** 表格列配置 */
const columns: TableProps<DataType>["columns"] = [
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
    width: 150,
  },
  {
    title: "店铺编号",
    dataIndex: "number",
    key: "number",
    width: 150,
  },
  {
    title: "销售额",
    dataIndex: "sale",
    key: "sale",
    width: 150,
  },
];
/** 文件上传接受的数据类型 */
interface DataItem {
  [key: string]: string | number;
}

/** 字段类型对应的图标映射 */
const fieldTypeIconMap = {
  string: <FieldStringOutlined style={{ color: "#488BF7" }} />,
  number: <FieldNumberOutlined style={{ color: "#2BC048" }} />,
  date: <CalendarOutlined style={{ color: "#488BF7" }} />,
};

/** 下拉选项 */
const items: MenuProps["items"] = [
  {
    key: "string",
    label: <span>{fieldTypeIconMap.string} 文本</span>,
  },
  {
    key: "number",
    label: <span>{fieldTypeIconMap.number} 数值</span>,
  },
  {
    key: "date",
    label: <span>{fieldTypeIconMap.date} 日期</span>,
  },
];

/**
 * 格式化行数据
 * @param rows 原始行数据
 * @param headers 表头数据
 * @returns 格式化后的行数据
 */
const formatRowsData = (
  rows: unknown[][] = [],
  headers: string[] = []
): DataItem[] => {
  return rows.map((row, rowIndex) => {
    // 创建新的行对象，添加唯一key
    const formattedRow: DataItem = {
      key: `${rowIndex + 1}`,
    };
    // 遍历所有表头，将对应的值添加到行数据中
    headers.forEach((header, index) => {
      formattedRow[header] = row[index] as string;
    });
    return formattedRow;
  });
};

interface DataConnectConfigProps {
  /** 更新新建数据源步骤 */
  updateStep?: () => void;
  /** 是否显示文件上传标题 */
  isShowUploadTitle?: boolean;
}
/** 文件上传和数据预览 */
const DataConnectConfig: React.FC<DataConnectConfigProps> = (props) => {
  const { updateStep, isShowUploadTitle = true } = props;
  const { message } = App.useApp();
  const { token } = useToken();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  /** 文件上传的步骤 */
  const [fileUploadStep, setFileUploadStep] = useState<number>(0);
  /** 上传的文件的原始名称 */
  const [fileOriginName, setFileOriginName] = useState<string>("");
  /** 解析后展示的文件sheet标题-可修改 */
  const [sheetTitle, setSheetTitle] = useState<string>("");
  /** 解析后文件sheet的标题行 */
  const [sheetHeaders, setSheetHeaders] = useState<string[]>([]);
  /** 解析后文件sheet的数据rows */
  const [sheetRows, setSheetRows] = useState<DataItem[]>([]);
  /** 数据库字段名称 */
  const [dbFieldNames, setDbFieldNames] = useState<string[]>([]);
  /** 字段类型 */
  const [fieldTypes, setFieldTypes] = useState<Record<number, FieldType>>({});
  /** 当前选中的segment */
  const [currentSegment, setCurrentSegment] = useState<
    "DataPreview" | "FieldDetails"
  >("DataPreview");
  /** 上传的文件 */
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  /** 数据预览的表格列配置 */
  const [previewTableColumns, setPreviewTableColumns] = useState<
    TableProps<unknown>["columns"]
  >([]);
  /** 标题行索引 */
  const [headerRowIndex, setHeaderRowIndex] = useState<string>("1");

  // 解析Excel文件
  const { parseFile } = useExcelParser();

  /**
   * 动态生成表格列配置
   * @param headers 表头数据
   * @returns 表格列配置
   */
  const generateTableColumns = (
    headers: string[] = []
  ): TableProps<unknown>["columns"] => {
    return headers.map((header, index) => ({
      title: (
        <Space>
          <Tooltip title="切换字段类型">
            <Dropdown
              placement="bottomLeft"
              menu={{ items }}
              trigger={["click"]}
            >
              <Button size="small" type="text" icon={fieldTypeIconMap.string} />
            </Dropdown>
          </Tooltip>
          <Input
            defaultValue={sheetHeaders[index] ?? header}
            size="small"
            onChange={(e) => {
              // 当输入框内容变化时，更新对应的sheetHeaders数据
              const newHeaders = [...sheetHeaders];
              newHeaders[index] = e.target.value;
              setSheetHeaders(newHeaders);
            }}
          />
        </Space>
      ),
      dataIndex: header,
      key: header,
      ellipsis: {
        showTitle: false,
      },
      width: 150,
      render: (text) => {
        return (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        );
      },
    }));
  };

  /** 文件上传的属性配置 */
  const draggerProps: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".csv,.xlsx,.xls",
    beforeUpload: (file) => {
      // 检查文件类型
      const isValidType = /\.(csv|xlsx|xls)$/i.test(file.name);
      if (!isValidType) {
        message.error(
          "当前文件格式暂不支持，请上传.csv、.xlsx或.xls格式的文件!"
        );
        // 阻止列表展示
        return Upload.LIST_IGNORE;
      }
      parseFile(file)
        .then((data: ExcelData) => {
          message.success(`${file.name} 解析成功！`);
          setSheetTitle(data.sheetName || "");
          setFileOriginName(data.fileName || "");
          setSheetHeaders(data.headers || []);
          // 格式化数据行，确保每行有唯一key，并且列名与header对应
          const formattedRows = formatRowsData(data.rows, data.headers);
          // 初始化数据库字段名称为 COL_xx 格式
          setDbFieldNames((data.headers || []).map((_, i) => `COL_${i + 1}`));
          // 初始化字段类型
          const newFieldTypes: Record<number, FieldType> = {};
          (data.headers || []).forEach((header, index) => {
            const sampleValue = formattedRows[0]?.[header];
            newFieldTypes[index] =
              detectDataType(sampleValue) || FieldType.STRING;
          });
          setFieldTypes(newFieldTypes);
          setSheetRows(formattedRows);
          // TODO:存储上传的文件,用户预览时用户确认上传
          setUploadedFile(file);
          // 动态生成表格的列配置
          const dynamicColumns = generateTableColumns(data.headers);
          setPreviewTableColumns(dynamicColumns);
          // 自动跳转到预览步骤
          setFileUploadStep(1);
        })
        .catch((err) => {
          message.error(`${file.name} 解析失败，请重试！`);
          console.error(err);
        });

      // 返回false阻止自动上传
      return false;
    },
    style: {
      width: 650,
    },
  };

  /** 当标题行索引变化时重新解析数据-只更新表头行和数据行 */
  const handleRefresh = () => {
    if (uploadedFile && headerRowIndex) {
      const headerRowNum = parseInt(headerRowIndex);
      if (headerRowNum > 0) {
        parseFile(uploadedFile, {
          headerRow: parseInt(headerRowIndex) - 1,
        }).then((data: ExcelData) => {
          setSheetHeaders(data.headers || []);
          // 格式化数据行，确保每行有唯一key，并且列名与header对应
          const formattedRows = formatRowsData(data.rows, data.headers);
          setSheetRows(formattedRows);

          // 初始化数据库字段名称为 COL_xx 格式
          setDbFieldNames((data.headers || []).map((_, i) => `COL_${i + 1}`));

          // 初始化字段类型
          const newFieldTypes: Record<number, FieldType> = {};
          (data.headers || []).forEach((header, index) => {
            const sampleValue = formattedRows[0]?.[header];
            newFieldTypes[index] =
              detectDataType(sampleValue) || FieldType.STRING;
          });
          setFieldTypes(newFieldTypes);

          // 动态生成表格的列配置
          const dynamicColumns = generateTableColumns(data.headers);
          setPreviewTableColumns(dynamicColumns);
        });
        message.success("数据已刷新");
      } else {
        message.error("标题行索引必须大于0");
      }
    } else {
      message.error("请先上传文件");
    }
  };

  /** 处理sheet标题变化 */
  const handleSheetTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSheetTitle(value);
  };

  /** segment切换 */
  const handleSegmentChange = (value: string) => {
    setCurrentSegment(value as "DataPreview" | "FieldDetails");
    // TODO:切换到数据预览时，重新生成表格列配置
  };

  /** 处理标题行索引变化-只允许输入数字 */
  const handleHeaderRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // 只允许数字
      setHeaderRowIndex(value);
    }
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  /** 处理点击文件确认上传事件 */
  const handleUploadFile = () => {
    console.log("确认上传");
    setIsModalOpen(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    message.success("文件上传成功");
    updateStep?.();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        title={
          <div className={`${prefixCls}-title`}>
            {isShowUploadTitle && <span>文件上传</span>}
            <div className={`${prefixCls}-steps`}>
              <Steps
                size="small"
                direction="horizontal"
                current={fileUploadStep}
                style={{ width: 400, cursor: "pointer" }}
                items={[
                  {
                    subTitle: "文件上传",
                    onClick: () => setFileUploadStep(0),
                    icon: (
                      <div
                        className={classNames("cool-bi-steps-icon-dot", {
                          active: fileUploadStep >= 0,
                        })}
                      />
                    ),
                  },
                  {
                    subTitle: "预览数据",
                    disabled: fileUploadStep === 0,
                    onClick: () => {
                      if (uploadedFile) setFileUploadStep(1);
                      else message.warning("请先上传文件");
                    },
                    icon: (
                      <div
                        className={classNames("cool-bi-steps-icon-dot", {
                          active: fileUploadStep >= 1,
                        })}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        }
        variant="borderless"
        className={prefixCls}
        style={{
          minWidth: 800,
        }}
      >
        {fileUploadStep === 0 && (
          <div className="content">
            <Dragger {...draggerProps}>
              <p className="cool-bi-drag-icon">
                <InboxOutlined style={{ fontSize: 50, color: "#1990FF" }} />
              </p>
              <p className="cool-bi-upload-text">
                <span>点击</span>
                或将文件拖拽到此区域上传
              </p>
              <p className="cool-bi-upload-hint">
                文件只支持.csv、.xlsx、.xls格式
              </p>
            </Dragger>
            <div className="upload-description-title">
              <Divider>
                <span>温馨提示</span>
              </Divider>
            </div>
            <div className="upload-description-list">
              <ul>
                <li>
                  请上传结构化数据，以便于我们更好的识别。有合并单元格的，请处理后再上传
                </li>
                <li>
                  系统会默认将上传文件的首行作为标题行，第二行开始作为要上传的数据
                </li>
                <li>最多支持1个Sheet的解析和上传</li>
                <li>建议使用Chrome浏览器上传</li>
                <li>文件上传过程中请保持网络稳定</li>
              </ul>
            </div>
            <div className="upload-example">
              <Table<DataType>
                columns={columns}
                dataSource={exampleData}
                pagination={false}
                size="small"
                bordered
              />
              <span>上传示例</span>
            </div>
          </div>
        )}
        {fileUploadStep === 1 && (
          <>
            <div
              className={classNames("second-upload-step-content", {
                "is-dark-mode": isDarkMode,
              })}
              style={{
                backgroundColor: isDarkMode
                  ? token.colorBgContainer
                  : "#f6f8fc",
              }}
            >
              <Tabs
                onChange={onChange}
                type="card"
                size="small"
                items={[
                  {
                    label: (
                      <div style={{ minWidth: 100 }}>
                        {fileOriginName || "数据表"}
                      </div>
                    ),
                    key: "1",
                    children: (
                      <div className="analyze-file-table">
                        <div className="analyze-file-table-header">
                          <Space className="analyze-file-table-header-tip">
                            <span>展示名称</span>
                            <Tooltip title="请输入规范的名称，不要使用特殊字符，前后不能包含空格，最多40个字符">
                              <QuestionCircleOutlined />
                            </Tooltip>
                            <Tooltip
                              title={sheetTitle ? "" : "展示名称不能为空"}
                              color="red"
                            >
                              <Input
                                className="sheet-title"
                                placeholder="请输入名称"
                                size="small"
                                value={sheetTitle}
                                maxLength={40}
                                showCount
                                onChange={handleSheetTitleChange}
                                style={{
                                  width: 280,
                                }}
                                status={sheetTitle.length === 0 ? "error" : ""}
                              />
                            </Tooltip>
                          </Space>
                          <Space className="analyze-file-table-header-operation">
                            <span>第</span>
                            <Input
                              style={{ width: 40 }}
                              size="small"
                              value={headerRowIndex}
                              onChange={handleHeaderRowChange}
                            />
                            <span>行是标题行</span>
                            <Button
                              size="small"
                              type="primary"
                              onClick={handleRefresh}
                            >
                              刷新
                            </Button>
                          </Space>
                        </div>
                        <div className="analyze-file-segment">
                          <Segmented<string>
                            size="middle"
                            options={[
                              { label: "数据预览", value: "DataPreview" },
                              { label: "字段详情", value: "FieldDetails" },
                            ]}
                            value={currentSegment}
                            onChange={handleSegmentChange}
                          />
                        </div>
                        <div className="analyze-file-table-wrapper">
                          {currentSegment === "DataPreview" ? (
                            <div className="data-preview">
                              <Table
                                columns={previewTableColumns}
                                dataSource={sheetRows}
                                pagination={false}
                                size="small"
                                bordered
                                scroll={{ x: "max-content", y: 360 }}
                              />
                              <Space className="tip" style={{ marginTop: 3 }}>
                                <InfoCircleOutlined />
                                <span>最多预览100行数据</span>
                              </Space>
                            </div>
                          ) : (
                            <div className="field-details">
                              <Table
                                columns={[
                                  {
                                    title: "文件列名",
                                    dataIndex: "name",
                                    width: 260,
                                    key: "name",
                                  },
                                  {
                                    title: "数据库字段名称",
                                    dataIndex: "field",
                                    width: 260,
                                    key: "field",
                                  },
                                  {
                                    title: "字段类型",
                                    dataIndex: "type",
                                    width: 180,
                                    key: "type",
                                  },
                                ]}
                                dataSource={sheetHeaders?.map(
                                  (colName: string, index) => {
                                    // 从sheetRows中获取此列的首个值用于类型检测
                                    const sampleValue = sheetRows[0]?.[colName];
                                    const fieldType =
                                      fieldTypes[index] ||
                                      detectDataType(sampleValue) ||
                                      FieldType.STRING;

                                    // 初始化数据库字段名
                                    const dbFieldName =
                                      dbFieldNames[index] || `COL_${index}`;

                                    return {
                                      key: index,
                                      name: (
                                        <Input
                                          size="small"
                                          value={colName}
                                          onChange={(e) => {
                                            // 当输入框内容变化时，更新对应的sheetHeaders数据
                                            const newHeaders = [
                                              ...sheetHeaders,
                                            ];
                                            newHeaders[index] = e.target.value;
                                            setSheetHeaders(newHeaders);
                                          }}
                                        />
                                      ),
                                      field: (
                                        <Input
                                          size="small"
                                          value={dbFieldName}
                                          onChange={(e) => {
                                            // 更新数据库字段名称
                                            const newDbFieldNames = [
                                              ...dbFieldNames,
                                            ];
                                            newDbFieldNames[index] =
                                              e.target.value;
                                            setDbFieldNames(newDbFieldNames);
                                          }}
                                        />
                                      ),
                                      type: (
                                        <Select
                                          size="small"
                                          value={fieldType}
                                          style={{ width: "100%" }}
                                          onChange={(value) => {
                                            // 更新字段类型
                                            const newFieldTypes = {
                                              ...fieldTypes,
                                            };
                                            newFieldTypes[index] = value;
                                            setFieldTypes(newFieldTypes);
                                          }}
                                          options={[
                                            {
                                              value: FieldType.STRING,
                                              label: (
                                                <span>
                                                  {fieldTypeIconMap.string} 文本
                                                </span>
                                              ),
                                            },
                                            {
                                              value: FieldType.NUMBER,
                                              label: (
                                                <span>
                                                  {fieldTypeIconMap.number} 数值
                                                </span>
                                              ),
                                            },
                                            {
                                              value: FieldType.DATE,
                                              label: (
                                                <span>
                                                  {fieldTypeIconMap.date} 日期
                                                </span>
                                              ),
                                            },
                                          ]}
                                        />
                                      ),
                                    };
                                  }
                                )}
                                pagination={false}
                                size="small"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
            <div className="upload-file-btn-wrapper">
              <Button
                type="primary"
                className="upload-file-btn"
                icon={<UploadOutlined />}
                size="middle"
                onClick={handleUploadFile}
              >
                确认上传
              </Button>
            </div>
          </>
        )}
      </Card>
      {/* 文件确认上传的提示modal */}
      <UploadConfirmModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default DataConnectConfig;
