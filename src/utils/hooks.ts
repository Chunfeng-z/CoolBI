import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { FieldType } from "./type";
const base = import.meta.env.VITE_BASE;
/** 出现异常返回主页，返回/,自动定位到主页 */
export const useNavigateToHome = (baseUrl: string = base) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(`${baseUrl}/`);
  };

  return handleBackToHome;
};

/**
 * Excel解析结果
 */
export interface ExcelData {
  headers?: string[];
  rows: unknown[][];
  fileName?: string;
  sheetName?: string;
}

/**
 * Excel解析选项
 */
interface ExcelParseOptions {
  /** 表头所在的行 */
  headerRow?: number;
  /** 指定要读取的工作表名称，不指定则读取第一个 */
  sheetName?: string;
}

/**
 * Excel/CSV 文件解析钩子
 * @returns {object} 包含解析方法的对象
 * @example
 * const { parseFile, parseFiles } = useExcelParser();
 */
export const useExcelParser = () => {
  /**
   * 解析单个Excel/CSV文件,只能解析第一个工作表
   *
   * @param {File} file - 要解析的文件
   * @param {ExcelParseOptions} options - 解析选项
   * @returns {Promise<ExcelData>} 包含解析后数据的Promise
   */
  const parseFile = useCallback(
    (file: File, options?: ExcelParseOptions): Promise<ExcelData> => {
      return new Promise((resolve, reject) => {
        if (!file) return reject(new Error("未提供文件"));
        // 检查文件类型是否支持
        const isValidType = /\.(csv|xlsx|xls)$/i.test(file.name);
        if (!isValidType) {
          return reject(new Error("暂不支持该文件类型"));
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const arrayBuffer = e.target?.result;
            if (!arrayBuffer) return reject(new Error("文件读取失败"));
            const fileName = file.name.toLowerCase();
            // 解析后的数据
            let jsonData: unknown[][] = [];
            // 解析后获取的表名
            let sheetName: string | undefined;
            if (fileName.endsWith(".csv")) {
              // CSV 需要使用 TextDecoder 解析为字符串
              const unite8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
              const utf8Decoder = new TextDecoder("utf-8");
              // 解码为字符串
              const csvText = utf8Decoder.decode(unite8Array);

              // 直接解析 CSV 字符串
              const workbook = XLSX.read(csvText, { type: "string" });
              sheetName = workbook.SheetNames[0];
              const workSheet = workbook.Sheets[sheetName];
              jsonData = XLSX.utils.sheet_to_json(workSheet, {
                header: 1,
              }) as unknown[][];
            } else if (
              fileName.endsWith(".xls") ||
              fileName.endsWith(".xlsx")
            ) {
              const workbook = XLSX.read(arrayBuffer, { type: "array" });
              sheetName = workbook.SheetNames[0];
              const workSheet = workbook.Sheets[sheetName];
              jsonData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
            }

            // 表头行
            const headerRow = options?.headerRow ?? 0;

            // 确保有足够的数据行
            if (jsonData.length <= headerRow) {
              return reject(new Error("文件数据不足，无法提取表头"));
            }

            const result: ExcelData = {
              headers: jsonData[headerRow] as string[], // 表头行
              rows: jsonData.slice(headerRow + 1), // 表头行之后的所有行作为数据行
              fileName: file.name,
              sheetName,
            };

            resolve(result);
          } catch (err) {
            reject(
              new Error(
                `文件解析错误: ${
                  err instanceof Error ? err.message : String(err)
                }`
              )
            );
          }
        };
        reader.readAsArrayBuffer(file);
        reader.onerror = () => reject(new Error("文件读取错误"));
      });
    },
    []
  );

  /**
   * 批量解析多个Excel/CSV文件
   *
   * @param {FileList | File[]} files - 要解析的文件列表
   * @param {ExcelParseOptions} options - 解析选项
   * @returns {Promise<ExcelData[]>} 包含所有解析后数据的Promise
   */
  const parseFiles = useCallback(
    async (
      files: FileList | File[],
      options: ExcelParseOptions = {}
    ): Promise<ExcelData[]> => {
      if (!files || files.length === 0) {
        return Promise.reject(new Error("未提供文件"));
      }

      try {
        const fileArray = Array.from(files);
        const results = await Promise.all(
          fileArray.map((file) => parseFile(file, options))
        );
        return results;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return Promise.reject(new Error(errorMessage));
      }
    },
    [parseFile]
  );

  return {
    parseFile,
    parseFiles,
  };
};

/** 判断输入数据的类型 */
export const detectDataType = (
  input: unknown
): FieldType.STRING | FieldType.NUMBER | FieldType.DATE | null => {
  if (typeof input === "string") {
    // 先尝试转换为日期
    const parsedDate = new Date(input);
    if (!isNaN(parsedDate.getTime())) {
      return FieldType.DATE;
    }
    return FieldType.STRING;
  }

  if (typeof input === "number" && !isNaN(input)) {
    return FieldType.NUMBER;
  }

  if (input instanceof Date && !isNaN(input.getTime())) {
    return FieldType.DATE;
  }

  return null;
};

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface AdjustedLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface RowItem {
  i: string;
  newX: number;
  newW: number;
  oldX: number;
  oldW: number;
  h: number;
}
/** 栅格数调整的布局缩放算法 */
export const resizeGrid = (
  layout: LayoutItem[],
  oldGrid: number,
  newGrid: number
): AdjustedLayoutItem[] => {
  const scale = newGrid / oldGrid;
  let adjustedRects: AdjustedLayoutItem[] = [];
  const rows: Record<number, RowItem[]> = {};

  // 1. 计算新的 x 和 w
  layout.forEach(({ i, x, y, w, h }) => {
    // 宽度最小为1
    const newW = Math.max(1, Math.round(w * scale));
    const newX = Math.round(x * scale);
    if (!rows[y]) rows[y] = [];
    rows[y].push({ i, newX, newW, oldX: x, oldW: w, h });
  });

  // 2. 逐行处理，调整位置防止重叠
  for (const y in rows) {
    const row = rows[parseInt(y)];
    // 按新 x 排序
    row.sort((a, b) => a.newX - b.newX);
    const newRow: AdjustedLayoutItem[] = [];
    let currentX = 0;

    row.forEach(({ i, newX, newW, h }) => {
      // 确保不重叠
      let adjustedX = Math.max(currentX, newX);
      if (adjustedX + newW > newGrid) {
        // 不能超出边界
        adjustedX = Math.max(0, newGrid - newW);
      }

      newRow.push({ i, x: adjustedX, y: parseInt(y), w: newW, h });
      // 更新下一次起始位置
      currentX = adjustedX + newW;
    });

    adjustedRects = adjustedRects.concat(newRow);
  }

  return adjustedRects;
};
