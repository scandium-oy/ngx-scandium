import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';
import { CameraButtonComponent } from '../components/camera-button/camera-button.component';
import { SelectDialogComponent } from '../components/select-dialog/select.dialog';
import { TakeVideoComponent } from '../components/take-video/take-video.component';
import { translateLoader } from './translateConfig';

describe('ngx-translate v18 integration', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CameraButtonComponent,
        SelectDialogComponent,
        TakeVideoComponent,
      ],
      providers: [
        provideHttpClient(),
        provideTranslateService({ loader: translateLoader }),
      ],
    }).compileComponents();
  });

  it('configures the HTTP loader for the existing asset path', () => {
    const config = TestBed.inject(TRANSLATE_HTTP_LOADER_CONFIG);

    expect(config.resources).toEqual([
      { prefix: './assets/i18n/', suffix: '.json' },
    ]);
  });
});
