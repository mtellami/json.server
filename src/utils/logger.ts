import COLORS from "../constants/colors";

export class Logger {

  static log(...messages: any[]): void {
    console.log(messages.join(""));
  }

  static success(...messages: any[]): void {
    this.log(COLORS.GREEN, COLORS.BOLD, ...messages, COLORS.RESET);
  }

  static error(messages: any[]): void {
    this.log(COLORS.REED, COLORS.BOLD, ...messages, COLORS.RESET);
  }

  static warning(messages: any[]): void {
    this.log(COLORS.YELLOW, COLORS.BOLD, ...messages, COLORS.RESET);
  }
}
