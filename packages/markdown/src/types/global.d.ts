// For this project development

declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    AgentMarkdown: (typeof import('@AgentMarkdown/markdown'))['AgentMarkdown'];
  }
}

export {};
