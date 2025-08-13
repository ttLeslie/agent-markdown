import type { Component } from 'vue';

interface RouteMetaCustom extends Record<string | number | symbol, unknown> {
  title?: string;
  icon?: Component;
}

declare module 'vue-router' {
  interface RouteMeta extends RouteMetaCustom {}
}
