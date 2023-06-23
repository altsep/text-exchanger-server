interface Info {
  creator: string;
  date: number;
}

interface Page {
  pageName: string;
  info: Info;
}

interface Text {
  pageName: string;
  isCreator: boolean;
  text: string;
}

export { Info, Page, Text };
