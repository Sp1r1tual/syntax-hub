export interface IMenuItem {
  path: string;
  label: string;
}

export interface IMenuConfig {
  label: string;
  items: IMenuItem[];
}
