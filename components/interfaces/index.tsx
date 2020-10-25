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

export interface Cal {
  visible: boolean;
  date: Date;
}

export interface Memo {
  calendar: {
    visible: boolean;
    date: Date;
  };
  saveCal: (currentDate: Cal) => void;
  login: () => void;
  signOut: () => void;
  getData: () => void;
  pushData: () => void;
}

export interface CalendarInterface {
  nativeEvent: {
    timestamp: number;
  };
}
