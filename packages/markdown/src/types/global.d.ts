// For this project development

declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    VMarkdownRenderer: (typeof import('@useAgent/markdown'))['VMarkdownRenderer'];
  }
}

export {};
