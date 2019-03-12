import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiService } from 'src/app/services/emoji/emoji.service';

export const EMOJI_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojiPickerPage),
  multi: true
};

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.page.html',
  styleUrls: ['./emoji-picker.page.scss'],
})
export class EmojiPickerPage implements ControlValueAccessor {

  emojiArr = [];

  _content: string;
  _onChanged: Function;
  _onTouched: Function;

  constructor(emojiProvider: EmojiService) {
    this.emojiArr = emojiProvider.getEmojis();
  }


  writeValue(obj: any): void {
    this._content = obj;
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
    this.setValue(this._content);
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  private setValue(val: any): any {
    this._content += val;
    if (this._content) {
      this._onChanged(this._content);
    }
  }

}
