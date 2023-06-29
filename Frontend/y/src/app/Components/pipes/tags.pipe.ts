import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from 'src/app/Interface';

@Pipe({
  name: 'tags',
  standalone:true
})
export class TagsPipe implements PipeTransform {

  transform(tags:Tag[]){
    let filtertags=tags.map(ft=>ft.TagBody)
    return filtertags
  }

}
