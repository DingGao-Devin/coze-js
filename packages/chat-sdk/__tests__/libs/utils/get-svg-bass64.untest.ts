import { describe, test } from 'vitest';

import { getSvgBase64 } from '../../../src/libs/utils/get-svg-base64';

describe('utils/get-svg-base64', () => {
  test('get-svg-base64', () => {
    const ck = getSvgBase64('asdfasdfadsf');
    console.log('get-svg-base64:', ck);
  });
});
