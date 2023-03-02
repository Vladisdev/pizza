import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordUpper',
})
export class WordUpperPipe implements PipeTransform {
  transform(value: string, wordParts: string[]): string {
    wordParts.forEach((item) => {
      value = value.replace(
        new RegExp('[А-Яа-я]*' + item + '[а-я]*', 'g'),
        (match: string) => {
          return match.toUpperCase();
        }
      );
    });

    return value;
  }
}
