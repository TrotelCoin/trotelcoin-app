export type FooterItem = {
  name: string | false | undefined;
  href: string;
  display: boolean;
  id: number;
  anotherWindow: boolean;
};

export type MobileFooterItem = {
  name: string;
  href: string;
  id: number;
  iconOutline?: React.JSX.Element;
  iconSolid?: React.JSX.Element;
};
