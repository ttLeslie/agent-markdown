// For this project development

declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    AgentMarkdown: (typeof import('agent-markdown-vue'))['AgentMarkdown'];
  }
}

export {};
