import { APP_INITIALIZER, inject, Injectable } from '@angular/core';
import { ConfigDTO } from './config.dto';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  #config!: ConfigDTO;

  setConfig(config: ConfigDTO) {
    this.#config = config;
  }

  getConfig() {
    return this.#config;
  }
}
