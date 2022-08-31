import portfolio from './data.json';
import { Portfolios } from '../../common/portfolio';

const portfolios = (): Portfolios => portfolio;

export * as queryData from './queryData';
export default portfolios;
