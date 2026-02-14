// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

// ================= 全局配置常量 =================
const API_URL = 'https://gemini.xzysz.fun/v1/chat/completions';
const API_KEY = 'Bearer T36u6f9PRTVNTDAAVdmPC8YGFQp8U88gPTPqfVyDaSgw7cwE';

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
    { link: 'https://gemini.xzysz.fun/', label: 'API 站', highlight: true },
  ],
}

// ================= 监控配置 =================
const workerConfig: WorkerConfig = {
  monitors: [
    // 仅保留图像模型监控
    {
      id: 'gemini-3-pro-image',
      name: 'Gemini 3 Pro Image',
      method: 'POST',
      target: API_URL,
      headers: COMMON_HEADERS,
      body: JSON.stringify({
        model: 'gemini-3-pro-image',
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 1
      }),
      expectedCodes: [200],
      timeout: 60000, // 图像模型生成较慢，保留较长的超时时间
    }, 
  ],

  notification: {
    timeZone: 'Asia/Shanghai', // 已修复此处原始代码中的语法错误
    gracePeriod: 2,
  },
}

// 维护计划
const maintenances: MaintenanceConfig[] = []

// Don't edit this line
export { maintenances, pageConfig, workerConfig }
