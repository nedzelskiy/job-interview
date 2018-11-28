'use strict';

export class MsgDialog {
  private messageField: HTMLElement;
  private msgDialog: HTMLElement;
  private isOpen: boolean;
  private timeout: number;

  constructor(msgDialog: HTMLElement, timeout: number = 3000) {
    this.msgDialog = msgDialog;
    this.messageField = msgDialog.children[0] as HTMLElement;
    this.msgDialog.onclick = this.hideMsgDialog.bind(this);
    this.isOpen = false;
    this.timeout = timeout;
  }

  showMsgDialog(message: string): void {
    if (this.isOpen && this.getMsgDialogText() === message) {
      return;
    }
    this.setMsgDialogText(message);
    if (!this.isOpen) {
      this.msgDialog.classList.remove('hidden');
    }
    this.isOpen = true;
    setTimeout(this.hideMsgDialog.bind(this), this.timeout);
  }

  hideMsgDialog(): void {
    if (this.isOpen) {
      this.msgDialog.classList.add('hidden');
    }
    this.isOpen = false;
  }

  getMsgDialogText(): string {
    return this.messageField.innerHTML;
  }

  setMsgDialogText(message: string): void {
    this.messageField.innerHTML = message;
  }
}
