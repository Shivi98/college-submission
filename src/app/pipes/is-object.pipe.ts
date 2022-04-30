import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "isObject"
})
export class IsObjectPipe implements PipeTransform {

  transform(value: unknown): boolean {
    return Boolean(value === null || (value && value.toString() === "[object Object]"));
  }

}
