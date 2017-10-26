import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable()
export class TopInterpretstionsService {

  constructor(private http:Http) { }


  getInterpretationTopList(){

    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let fullDate = year+'-'+month+'-'+day
    console.log("today is "+fullDate);

    let url =  '../../api/interpretations?fields=id,type,text,created,likes,likedBy[id,name],user[id,name],' +
      'comments[id,created,text,user[id,name]],eventReport[id,name,relativePeriods],' +
      'eventChart[id,name,relativePeriods],chart[id,name,relativePeriods],' +
      'map[id,name,mapViews[relativePeriods]],reportTable[id,name,relativePeriods]&filter=lastUpdated:ge:'+fullDate+'';

    return this.http.get(url).map((response: Response) => response.json());
  }


  fetchInterpretation(interpretation){
    let url = 'api/interpretations?fields=id,type,text,created,likes,likedBy[id,name],user[id,name],' +
      'comments[id,created,text,user[id,name]],eventReport[id,name,relativePeriods],eventChart[id,name,relativePeriods],' +
      'chart[id,name,relativePeriods],map[id,name,mapViews[relativePeriods]]' +
      ',reportTable[id,name,relativePeriods]&filter=id:in:['+interpretation.id+']&order=created:desc';

    return this.http.get(url).map((response: Response) => response.json());
  }

  fetchAuthor(author){
    let url = '../../api/interpretations?fields=id,type,text,created,likes,likedBy[id,name],user[id,name],' +
      'comments[id,created,text,user[id,name]],eventReport[id,name,relativePeriods],' +
      'eventChart[id,name,relativePeriods],chart[id,name,relativePeriods],map[id,name,mapViews[relativePeriods]],' +
      'reportTable[id,name,relativePeriods]&filter=user.id:eq:'+author.id+'&page=1&pageSize=10';

    return this.http.get(url).map((response: Response) => response.json());

  }

  fetchCommentor(commentor){
    let url = '../../api/interpretations?fields=id,type,text,created,likes,likedBy[id,name],user[id,name],' +
      'comments[id,created,text,user[id,name]],eventReport[id,name,relativePeriods],eventChart[id,name,relativePeriods],' +
      'chart[id,name,relativePeriods],map[id,name,mapViews[relativePeriods]],reportTable[id,name,relativePeriods]' +
      '&filter=comments.user.id:eq:'+commentor.id+'&page=1&pageSize=10';

    return this.http.get(url).map((response: Response) => response.json());
  }
}
