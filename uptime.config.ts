// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

// ================= 全局配置常量 =================
const API_URL = 'https://image.xzysz.fun/v1/chat/completions';
const API_KEY = 'Bearer aFcw7mBcwHc3GRwDEfdNZU8GKPaGgPbNTJst3MqnkGItYumU';

// 公共请求头
const COMMON_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': API_KEY,
};

// ================= 页面配置 =================
const pageConfig: PageConfig = {
  title: "模型服务状态监控",
  links: [
    { link: 'https://github.com/lyc8503/UptimeFlare', label: 'GitHub' },
    { link: 'https://image.xzysz.fun/', label: 'API 站', highlight: true },
  ],
}

// ================= 监控配置 =================
const workerConfig: WorkerConfig = {
  monitors: [
    // 使用 Array.from 生成 5 个相同的监控任务
    ...Array.from({ length: 5 }).map((_, index) => {
      const num = index + 1; // 序号 1 到 5
      return {
        id: `gemini-3-pro-image-${num}`, // 确保 ID 唯一: gemini-3-pro-image-1 ...
        name: `Gemini 3 Pro Image Test #${num}`, // 显示名称区分: Test #1 ...
        method: 'POST',
        target: API_URL,
        headers: COMMON_HEADERS,
        body: JSON.stringify({
          model: 'gemini-3-pro-image', // 确保这里是你想要测试的图像模型 ID
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 1
        }),
        expectedCodes: [200],
        timeout: 60000, // 图像生成通常较慢，给予 60秒超时
      };
    }),
  ],

  notification: {
    timeZone: 'Asia/Shanghai',
    gracePeriod: 2,
  },
}

// 维护计划
const maintenances: MaintenanceConfig[] = []

// Don't edit this line
export { maintenances, pageConfig, workerConfig }
