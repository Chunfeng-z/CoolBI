import React, { useEffect, useState } from "react";
import {
  // 消息气泡
  Bubble,
  // 发送框
  Sender,
} from "@ant-design/x";
import "./index.scss";
import { message } from "antd";

const AIChat: React.FC = () => {
  const [value, setValue] = useState<string>("Hello? this is X!");
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (loading) {
      const eventSource = new EventSource("http://localhost:3000/sse");

      eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log("EventSource received:", data);
        setEvents((prev) => prev + `Current Time: ${data.time}`); // 添加新事件
      };

      eventSource.onerror = () => {
        eventSource.close();
        setLoading(false);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [loading]);
  return (
    <>
      {contextHolder}
      <div className="ai-container">
        <div className="ai-content" style={{ width: 500, marginTop: 100 }}>
          <Bubble content="Hello, Ant Design X!" placement="start" role="ai" />
          {events && <Bubble content={events} placement="start" role="ai" />}
          <Sender
            value={value}
            loading={loading}
            onChange={(v) => {
              setValue(v);
            }}
            onSubmit={() => {
              setValue("");
              setLoading(true);
              messageApi.info("Send message!");
            }}
            onCancel={() => {
              setLoading(false);
              messageApi.error("Cancel sending!");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AIChat;
