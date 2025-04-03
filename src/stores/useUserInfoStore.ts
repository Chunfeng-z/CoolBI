import CryptoJS from "crypto-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { UserInfoState } from "@/types/login";

const SECRET_KEY = "your-secret-key";

// AES 加密
const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};
// AES 解密
const decrypt = (ciphertext: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("解密失败", error);
    return null;
  }
};

interface UserInfoAction {
  /** 批量修改状态 */
  setUserInfo: (userInfo: Partial<UserInfoState>) => void;
  /** 清空所有信息 */
  clearUserInfo: () => void;
}

const useUserInfoStore = create<UserInfoState & UserInfoAction>()(
  persist(
    immer((set) => ({
      userId: "",
      username: "",
      account: "",
      avatar: "",
      phone: "",
      email: "",
      role: "",
      setUserInfo: (userInfo) =>
        set((state) => {
          Object.assign(state, userInfo);
        }),
      clearUserInfo: () =>
        set(() => ({
          userId: null,
          username: null,
          account: null,
          avatar: null,
          phone: null,
          email: null,
          role: null,
        })),
    })),
    {
      // 命名空间
      name: "cool_bi_userinfo",
      storage: {
        getItem: (key) => {
          const encryptedData = localStorage.getItem(key);
          if (!encryptedData) return null;
          return JSON.parse(decrypt(encryptedData) || "null");
        },
        setItem: (key, value) => {
          const encryptedData = encrypt(JSON.stringify(value));
          localStorage.setItem(key, encryptedData);
        },
        removeItem: (key) => localStorage.removeItem(key),
      },
    }
  )
);

export default useUserInfoStore;
