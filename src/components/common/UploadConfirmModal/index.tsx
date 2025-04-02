import { Button, Checkbox, Modal } from "antd";
import React, { useState } from "react";
const prefixCls = "upload-confirm-modal";
interface UploadConfirmModalProps {
  /** 是否显示Modal */
  isModalOpen: boolean;
  /** 确认时的回调 */
  handleOk: () => void;
  /** 取消时的回调 */
  handleCancel: () => void;
}

/** 文件上传确认Modal */
const UploadConfirmModal: React.FC<UploadConfirmModalProps> = (props) => {
  const { isModalOpen, handleOk, handleCancel } = props;
  /** 数据协议的选择状态 */
  const [isNoticeChecked, setIsNoticeChecked] = useState<boolean>(false);
  return (
    <div className={prefixCls}>
      <Modal
        title="数据来源确认函"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        styles={{
          content: {
            width: 500,
            height: 600,
            display: "flex",
            flexDirection: "column",
          },
          body: {
            display: "flex",
            flexDirection: "column",
            gap: 8,
          },
          footer: {
            marginTop: "auto",
          },
        }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={!isNoticeChecked}
            onClick={handleOk}
          >
            确定
          </Button>,
        ]}
      >
        <span>
          您正在使用 Cool BI
          文件上传功能，请您声明并保证您在使用数据上传过程中会遵守如下要求:
        </span>
        <span>
          1. 文件上传的数据应当符合法律法规规定，不得上传涉及以下内容的数据：
        </span>
        <span> （1）侵害个人信息依法得到保护的权利；</span>
        <span> （2）侵犯他人知识产权、商业秘密及其他合法权益；</span>
        <span> （3）违反法律法规的禁止性规定；</span>
        <span>
          （4）任何海外消费者的任何数据（包含中国香港，中国澳门与中国台湾）；
        </span>
        <span>2. 不上传和储存带有病毒的、蠋虫的、木马和其他有害的数据；</span>
        <span>
          3. 不上传和储存侵犯他人知识产权、商业秘密及其他合法权益的数据；
        </span>
        <span>
          不上传任何破坏或可能破坏网络安全的数据（包括但不限于钓鱼、黑客、网络诈骗、网站或空间中含有或涉嫌散播病毒、木马、恶意代码，及通过虚拟服务器对其他网站、服务器进行涉嫌攻击行为如扫描、嗅探、ARP欺骗、DOS等）;
        </span>
        <span>
          请确认您上传的数据来源正确，数据准确，数据内容不涉及违法违规内容，如有违规，后果自负。
        </span>
        <Checkbox
          checked={isNoticeChecked}
          onChange={(e) => {
            setIsNoticeChecked(e.target.checked);
          }}
        >
          我已阅读并同意该协议
        </Checkbox>
      </Modal>
    </div>
  );
};

export default UploadConfirmModal;
