import { v4 as uuidv4 } from "uuid";

/** 生成唯一的标识 */
export const generateUUID = () => {
  return `${uuidv4()}-${Date.now().toString(36)}`;
};
