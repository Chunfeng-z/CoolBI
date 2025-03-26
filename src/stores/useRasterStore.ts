import { create } from "zustand";

interface RasterState {
  /** 是否显示栅格配置 */
  isShowPageRaster: boolean;
  /** 修改前的栅格数 */
  prevRasterNum: number | null;
  /** 划分的栅格数 */
  rasterNum: number;
  /** 栅格列间距 */
  rasterGap: number;
  /** 卡片的行间距 */
  cardRowSpace: number;
}

interface RasterAction {
  setIsShowPageRaster: (isShow: boolean) => void;
  /** 更新栅格数 */
  setRasterNum: (num: number) => void;
  /** 更新栅格列间距 */
  setRasterGap: (gap: number) => void;
  /** 更新行间距 */
  setCardRowSpace: (space: number) => void;
}

const useRasterStore = create<RasterState & RasterAction>((set) => ({
  isShowPageRaster: false,
  rasterNum: 12,
  prevRasterNum: null,
  rasterGap: 8,
  cardRowSpace: 12,
  setIsShowPageRaster: (isShow) => set({ isShowPageRaster: isShow }),
  setRasterNum: (num) =>
    set((state) => ({ prevRasterNum: state.rasterNum, rasterNum: num })),
  setRasterGap: (gap) => set({ rasterGap: gap }),
  setCardRowSpace: (space) => set({ cardRowSpace: space }),
}));

export default useRasterStore;
