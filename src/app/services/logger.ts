import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { LogLevel } from './log-level';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private level = environment.logLevel;

  debug(message: string, ...optional: any[]) {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(`%c ${message}`, "background: #fff; color: #ff7700", ...optional);
    }
  }

  info(message: string, ...optional: any[]) {
    if (this.level <= LogLevel.INFO) {
      console.info(`%c ${message}`, "background: #fff; color: #0800ff", ...optional);
    }
  }

  warn(message: string, ...optional: any[]) {
    if (this.level <= LogLevel.WARN) {
      console.warn(message, ...optional);
    }
  }

  error(message: string, ...optional: any[]) {
    if (this.level <= LogLevel.ERROR) {
      console.error(message, ...optional);
    }
  }

}
