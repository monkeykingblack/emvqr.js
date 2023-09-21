import { assert } from 'chai';
import { DecoderMpm, MerchantPresentedMode } from '../../.build';

describe('DecoderMpmTest', () => {
  it('#testSuccessDecode', () => {
    const encoded =
      '00020101021102160004hoge0104abcd520441115303156540523.725502015603500570155802CN5914BEST TRANSPORT6007BEIJING6107123456762950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京0204最佳运输0304abcd65020080320016A01122334499887707081234567863044220';

    const merchantPresentedMode = DecoderMpm.decode(encoded, MerchantPresentedMode);

    assert.equal(merchantPresentedMode.countryCode?.value, 'CN');
    assert.equal(merchantPresentedMode.merchantCategoryCode?.value, '4111');
    assert.equal(merchantPresentedMode.merchantCity?.value, 'BEIJING');
    assert.equal(merchantPresentedMode.merchantName?.value, 'BEST TRANSPORT');
    assert.equal(merchantPresentedMode.payloadFormatIndicator?.value, '01');
    assert.equal(merchantPresentedMode.pointOfInitiationMethod?.value, '11');
    assert.equal(merchantPresentedMode.postalCode?.value, '1234567');
    assert.equal(merchantPresentedMode.tipOrConvenienceIndicator?.value, '01');
    assert.equal(merchantPresentedMode.transactionAmount?.value, '23.72');
    assert.equal(merchantPresentedMode.transactionCurrency?.value, '156');
    assert.equal(merchantPresentedMode.valueOfConvenienceFeeFixed?.value, '500');
  });
});
