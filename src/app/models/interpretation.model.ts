import { Comment } from './interpretation-comment.model';

export interface Interpretation{
    id: string;
  text: string;
  type: string;
  created: string;
  lastUpdated: string;
  likes: number;
  user : {
    id : string,
    name : string,
    displayName : string;
  };
  likedBy: Array<any>;
  comments: Array<Comment>;
  eventReport: any;
  eventChart: any;
  chart: any;
  map: any;
  reportTable: any;
}