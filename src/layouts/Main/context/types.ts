export interface State {
  sidebarCollapsed: boolean;
  sidebarMobileCollapsed: boolean;
}

export interface Value {
  state: State;
  methods: {
    setSidebarCollapsed: (collapsed: boolean) => void;
    setSidebarMobileCollapsed: (collapsed: boolean) => void;
  };
}
