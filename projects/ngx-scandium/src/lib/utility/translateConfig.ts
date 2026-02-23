import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

const path = `./assets/i18n/`;

export const translateLoader = provideTranslateHttpLoader({ prefix: path, suffix: '.json' });
