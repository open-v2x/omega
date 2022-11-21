import { get } from 'lodash';
import qs from 'qs';

const routeMap = {};

const generatePath = (record, params) => {
  const { path } = record;
  if (!params) {
    return path;
  }
  let newPath = path;
  Object.keys(params).forEach(key => {
    newPath = newPath.replace(`:${key}`, params[key]);
  });
  return newPath;
};

export const getPath = ({ key, params, query = {} }) => {
  const record = get(routeMap, key);
  if (!record) {
    return '/';
  }
  const path = generatePath(record, params);
  const str = qs.stringify(query);
  return str ? `${path}?${str}` : path;
};
