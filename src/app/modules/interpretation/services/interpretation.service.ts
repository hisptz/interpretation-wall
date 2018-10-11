import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client'
import { Comment } from '../../../models/interpretation-comment.model';

@Injectable({
  providedIn: 'root'
})
export class InterpretationService{

  constructor(private httpService: NgxDhis2HttpClientService) { }

  getInterpretations(rootUrl) {
    return new Observable(observer =>  {
        this.httpService.get(`interpretations.json?fields=id,type,text,created,lastUpdated,likes,likedBy[id,name],user[id,name,displayName],comments[id,created,lastUpdated,text,user[id,name,displayName]],eventReport[*],eventChart[*],chart[*],map[id,name,mapViews[*]],reportTable[*]&paging=false`)
        .subscribe((response:any) =>  {
            observer.next(response.interpretations); 
            observer.complete(); 
        }, (error) => observer.error(error)); 
      }); 
    }

  getInterpretation(interpretation: any) {
    const interpretationUrl = 'interpretations/' + interpretation.id + '.json?fields=id,type,text,lastUpdated,href,' +
      'created,likes,likedBy[id,name,displayName],user[id,name,displayName],comments[id,created,lastUpdated,text,' +
      'user[id,name,displayName]],' +
      interpretation.type.toLowerCase() + '[id,name]';
    return this.httpService.get(interpretationUrl);
  }
  
    create(interpretationData: any, rootUrl: any) {
    return new Observable(observer => {
      const url = 'interpretations/' + interpretationData.type + '/' + interpretationData.id;
      this.httpService.post(url, interpretationData.message).subscribe(() => {
        const interpretationsUrl = interpretationData.type + 's/' + interpretationData.id +
          '?fields=interpretations[id,type,text,lastUpdated,href,created,likes,likedBy[id,name,displayName],' +
          'user[id,name,displayName],comments[id,created,lastUpdated,text,user[id,name,displayName]],' +
          interpretationData.type + '[id,name]]';
        this.httpService.get(interpretationsUrl)
          .subscribe((interpretationResponse: any) => {
            observer.next(interpretationResponse.interpretations);
            observer.complete();
          }, interpretationError => observer.error(interpretationError));
      }, error => observer.error(error));
    });
  }
  
    edit(interpretation: any) {
    return new Observable(observer => {
      this.httpService.put( '/interpretations/' + interpretation.id, interpretation.text)
        .subscribe(() => {
          this.getInterpretation(interpretation)
            .subscribe((interpretationObject: any) => {
              console.log(interpretationObject)
              observer.next(interpretationObject);
              observer.complete();
            }, interpretationError => observer.error(interpretationError));
        }, error => observer.error(error));
    });

    //return this.httpService.put( '/interpretations/' + interpretation.id, interpretation.text)
  }  
  
    delete(interpretation: any) {
    return this.httpService.delete('interpretations/' + interpretation.id);
  }

  updateLikeStatus(interpretation: any, rootUrl: string, like: boolean = true) {
    return new Observable(observer => {
      const likePromise = like ? this.httpService.post('interpretations/' + interpretation.id + '/like', {}) :
        this.httpService.delete('interpretations/' + interpretation.id + '/like');

      likePromise.subscribe(() => {
        this.getInterpretation(interpretation)
          .subscribe((interpretationObject) => {
            observer.next(interpretationObject);
            observer.complete();
          }, interpretationError => observer.error(interpretationError));
      }, error => observer.error(error));
    });
  }

    postComment(interpretation: any, rootUrl: string) {
    return new Observable(observer => {
      this.httpService.post('interpretations/' + interpretation.id + '/comments', interpretation.comment)
        .subscribe(() => {
          this.getInterpretation(interpretation)
            .subscribe((interpretationObject: any) => {
              observer.next(interpretationObject);
              observer.complete();
            }, interpretationError => observer.error(interpretationError));
        }, commentError => observer.error(commentError));
    });
  }

  postInterpretationComment(interpretation: any, comment : Comment) {
    return new Observable(observer => {
      this.httpService.post('interpretations/' + interpretation.id + '/comments', comment)
        .subscribe(() => {
          this.getInterpretation(interpretation)
            .subscribe((interpretationObject: any) => {
              observer.next(interpretationObject);
              observer.complete();
            }, interpretationError => observer.error(interpretationError));
        }, commentError => observer.error(commentError));
    });
  }

  deleteComment(interpretationId: string, commentId: string) {
    return this.httpService.delete('interpretations/' + interpretationId + '/comments/' + commentId);
  }

    editComment(interpretation: any, comment: Comment) {
    return new Observable(observer => {
      this.httpService.put('interpretations/' + interpretation.id + '/comments/' + comment.id, comment.text)
        .subscribe(() => {
          this.getInterpretation(interpretation)
            .subscribe((interpretationObject: any) => {
              observer.next(interpretationObject);
              observer.complete();
            }, interpretationError => observer.error(interpretationError));
        }, commentError => observer.error(commentError));
    });
  }

}
