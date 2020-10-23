export interface NavProps {
  navigation: {
    navigate: (name: string, params?: object) => void;
    push: (name: string) => void;
    goBack: () => void;
    setOptions: (props: object) => void;
  };
  route: {
    params?: any;
  };
}
