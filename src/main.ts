import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { catchError, delay, tap } from 'rxjs';
import { ConfigService } from './app/config/config.service';
import { parseDTO } from './app/config/config.dto';

function initializeAppFactory(
  httpClient: HttpClient,
  configService: ConfigService
) {
  const url = './config.json';
  return () =>
    httpClient.get(url).pipe(
      tap((config) => {
        const dto = parseDTO(config);
        if (dto.success) {
          configService.setConfig(dto.data);
        } else {
          console.error('Invalid config.json', dto.error);
        }
      })
    );
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [HttpClient, ConfigService],
    },
  ],
});
