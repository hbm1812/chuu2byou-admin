import { Spin } from "antd";
import React from "react";

const AppLoading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default AppLoading;
