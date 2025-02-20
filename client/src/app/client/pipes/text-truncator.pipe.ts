import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TextTruncatorPipe implements PipeTransform {

  transform(value: string, limit: number = 100, ellipsis: string = '...'): string {
    if (value.length > limit) {
        return value.substring(0, limit) + ellipsis;
    }
    return value;
}

}
