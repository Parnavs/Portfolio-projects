import { IContentBase } from './IContentBase.interface';

export interface IMovie extends IContentBase {
  title: string;
  original_title: string;
  release_date: string;
}
