interface HistoryProps {
  key: string;
  type: string;
}
interface RoutesProps {
  key: string;
  name: string;
  params: object;
  state?: StateProps;
}
interface StateProps {
  history?: HistoryProps[];
  index: number;
  key: string;
  routeNames: string[];
  routes: RoutesProps[];
  stale: boolean;
  type: string;
}

interface route {
  name: string;
}

interface resetProps {
  index: number;
  routes: route[];
}

export interface NavigationProps {
  addListener: () => void;
  canGoBack: () => boolean;
  closeDrawer: () => void;
  dangerouslyGetParent: () => NavigationProps;
  dangerouslyGetState: () => StateProps;
  dispatch: () => void;
  goBack: () => void;
  isFocused: () => boolean;
  jumpTo: (name: string) => void;
  navigate: (name: string, params?: object) => void;
  openDrawer: () => void;
  pop: () => void;
  popToTop: () => void;
  push: (name: string) => void;
  removeListener: () => void;
  replace: () => void;
  reset: (props: resetProps) => void;
  setOptions: (props: object) => void;
  setParams: (props: object) => void;
  toggleDrawer: () => void;
}
