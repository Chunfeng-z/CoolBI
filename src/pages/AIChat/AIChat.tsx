import React, { useEffect, useState } from "react";
import { Bubble, BubbleProps, Sender, Welcome } from "@ant-design/x";
import "./index.scss";
import { GetRef, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RolesType } from "@ant-design/x/es/bubble/BubbleList";
import { Typography } from "antd";
import markdownit from "markdown-it";
const markdown = `### GPT的发展历程`;
const md = markdownit({ html: true, breaks: true });

const renderMarkdown: BubbleProps["messageRender"] = (content) => (
  <Typography>
    <div dangerouslySetInnerHTML={{ __html: md.render(content.trim()) }} />
  </Typography>
);

const rolesAsFunction: RolesType = (bubbleData) => {
  switch (bubbleData.role) {
    case "ai":
      return {
        placement: "start" as const,
        avatar: { icon: <UserOutlined />, style: { background: "#fde3cf" } },
        shape: "corner",
        // typing: { step: 2, interval: 50 },
        messageRender: renderMarkdown,
      };
    case "user":
      return {
        placement: "end" as const,
        avatar: { icon: <UserOutlined />, style: { background: "#87d068" } },
        shape: "corner",
      };
    default:
      return {};
  }
};

const AIChat: React.FC = () => {
  const [sendValue, setSendValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const listRef = React.useRef<GetRef<typeof Bubble.List>>(null);
  const [messageList, setMessageList] = useState<
    {
      key: number;
      role: "ai" | "user";
      content: string;
    }[]
  >([
    {
      key: 0,
      role: "ai",
      content: `
> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)
`.trim(),
    },
  ]);
  async function fetchData(sendValue: string) {
    try {
      const response = await fetch("http://localhost:3000/ds/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1",
          messages: [{ role: "user", content: sendValue }],
          stream: true,
        }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        console.log(decoder.decode(value, { stream: true }));
      }
    } catch (error) {
      console.error(error);
    }
  }
  const getDataSse = () => {
    const eventSource = new EventSource("http://localhost:3000/sse");
    let receivedText = ``;
    eventSource.onmessage = (event) => {
      receivedText += event.data;
      console.log("receivedText", receivedText);

      setMessageList((prev) => {
        return [
          ...prev,
          { key: prev.length, role: "ai", content: receivedText },
        ];
      });
    };
    eventSource.onerror = (error) => {
      console.error(error);
      eventSource.close();
      setLoading(false);
    };
  };
  const [renderKey, setRenderKey] = React.useState(0);
  useEffect(() => {
    if (loading) {
      // fetchData(sendValue);
      getDataSse();
    }
  }, [loading]);
  React.useEffect(() => {
    const id = setTimeout(() => {
      setRenderKey((prev) => prev + 1);
    }, markdown.length * 100 + 2000);

    return () => {
      clearTimeout(id);
    };
  }, [renderKey]);

  return (
    <>
      {contextHolder}
      <div className="chat-page-container">
        <div className="message-container">
          <Welcome
            style={{
              backgroundImage:
                "linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)",
              borderStartStartRadius: 4,
            }}
            icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
            title="Hello, I'm DS"
            description="Fine DS test"
          />
          {/* <Bubble.List
            ref={listRef}
            style={{ maxHeight: 800, padding: 10 }}
            roles={rolesAsFunction}
            items={messageList}
          /> */}
          <div className="x" key={renderKey}>
            {/* {loading && ( */}
            <Bubble
              role="ai"
              content={markdown}
              typing
              placement="start"
              shape="corner"
              messageRender={renderMarkdown}
              avatar={{
                icon: <UserOutlined />,
                style: { background: "#fde3cf" },
              }}
            />
            {/* )} */}
          </div>
        </div>
        <div className="send-container">
          <Sender
            value={sendValue}
            loading={loading}
            placeholder="请输入提问内容"
            onChange={(v) => {
              setSendValue(v);
            }}
            onSubmit={() => {
              setSendValue("");
              setLoading(true);
              setMessageList((prev) => [
                ...prev,
                { key: prev.length, role: "user", content: sendValue },
              ]);
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
