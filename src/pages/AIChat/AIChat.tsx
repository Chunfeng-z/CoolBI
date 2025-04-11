import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./index.scss";

const AIChat: React.FC = () => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
  ];
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="chat-page-container">
          <div className="left-wrapper"></div>
          <div className="right-wrapper"></div>
        </div>
      </DndProvider>
    </>
  );
};

export default AIChat;
