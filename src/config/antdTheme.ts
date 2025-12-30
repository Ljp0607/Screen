import type { ThemeConfig } from "antd"; // 导入官方 ThemeConfig 类型

// 映射UI规范到Antd主题变量
export const antdTheme: ThemeConfig = {
  // 主色（对应UI「整体主色」）
  token: {
    colorPrimary: "#247BFF", // 主色
    colorPrimaryHover: "#0967D1", // 主色悬浮
    colorPrimaryActive: "#137AEE", // 主色点击
    colorPrimaryText: "#FFFFFF", // 主色文字（按钮文字）

    // 语义色（对应UI「语义色板」）
    colorSuccess: "#00FF8A", // 成功色（正常）
    colorWarning: "#FFEA51", // 警告色（预警）
    colorError: "#FF3B3B", // 错误色（报警）
    colorInfo: "#247BFF", // 信息色（进行中）
    colorTextDisabled: "#A1AFC5", // 禁用色（离线）

    // 容器/背景色（适配大屏深色背景）
    colorBgContainer: "#031241", // 组件容器背景（匹配大屏背景）
    colorBgElevated: "#163679", // 浮层背景（匹配悬浮背景）
  },
  // 组件单独配置（按需调整）
  components: {
    Button: {
      defaultBg: "#247BFF", // 按钮默认背景
      defaultHoverBg: "#0967D1", // 按钮悬浮背景
    },
    Table: {
      headerBg: "#247BFF80", // 表头背景（25%透明度，对应UI「表头」）
      rowHoverBg: "#163679", // 表格行悬浮背景
    },
  },
};
