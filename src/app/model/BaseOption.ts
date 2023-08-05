export class BaseOption {
    value: any;
    text: any;
  
    constructor(value: any, text?: any, disabled?: boolean) {
      this.value = value;
      this.text = text === undefined ? value : text;
    }
}