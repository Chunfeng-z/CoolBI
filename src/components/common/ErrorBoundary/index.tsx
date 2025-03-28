import React, { Component, ReactNode } from "react";
const prefixCls = "error-boundary";
import "./index.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/** 错误边界组件 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // 当子组件发生错误时，更新状态以触发回退 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("捕获到错误:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className={prefixCls}>发生错误，请稍后重试。</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
