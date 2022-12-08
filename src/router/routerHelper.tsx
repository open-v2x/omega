import React from 'react';
import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router';

export interface RoutedProps<Params = any, State = any> {
  location: State;
  navigate: NavigateFunction;
  params: Params;
}

export function withRouter<P extends RoutedProps>(Child: React.ComponentClass<P>) {
  return (props: Omit<P, keyof RoutedProps>) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Child {...(props as P)} location={location} navigate={navigate} params={params} />;
  };
}

export function treeToList(arrs: any[], childs: string, attrArr: string[] = []) {
  let attrList = [];

  if (!Array.isArray(arrs) || !arrs.length) return [];
  if (typeof childs !== 'string') return [];
  if (!Array.isArray(attrArr) || (Array.isArray(attrArr) && !attrArr.length)) {
    attrList = Object.keys(arrs[0]);
    attrList.splice(attrList.indexOf(childs), 1);
  } else {
    attrList = attrArr;
  }

  let list = [];
  const getObj = (arr: any[]) => {
    arr.forEach(row => {
      let obj = {};
      attrList.forEach(item => {
        obj[item] = row[item];
      });
      list.push(obj);
      if (row[childs]) {
        getObj(row[childs]);
      }
    });
    return list;
  };

  return getObj(arrs);
}
