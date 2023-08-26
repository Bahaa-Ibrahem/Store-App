export interface Table {
  title: string;
  rowPropertyName: string;
  type: string; // data, number, date, image, action
  actionType?: string; // icon
  actionIconsName?: {iconName: string, actionName: string, actionType: string}[];
  actionsName?: string[];
  className?: string;
  classColor?: string;
  actionName?: string;
}

export interface Columns  {
  title: string;
  rowPropertyName: string;
  className: string;
  type: string;
  actionIconsName?: {iconName: string, actionName: string, actionType: string}[],
  actionsName?: string[],
  actionType?: string,
  classColor?: string,
  actionName?: string
}
