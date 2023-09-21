import { assert, expect } from 'chai';
import {
  DecoderMpm,
  DuplicateTagException,
  InvalidTagException,
  MerchantPresentedMode,
} from '../../.build';

describe('MerchantPresentedModeDecoderTest', () => {
  it('#testSuccessDecodePayloadFormatIndicator', () => {
    const merchantPresentMode = DecoderMpm.decode('000201', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.payloadFormatIndicator);
    assert.equal(merchantPresentMode.payloadFormatIndicator?.tag, '00');
    assert.equal(merchantPresentMode.payloadFormatIndicator?.length, 2);
    assert.equal(merchantPresentMode.payloadFormatIndicator?.value, '01');
  });

  it('#testSuccessDecodePointOfInitiationMethod', () => {
    const merchantPresentMode = DecoderMpm.decode('010211', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.pointOfInitiationMethod);
    assert.equal(merchantPresentMode.pointOfInitiationMethod?.tag, '01');
    assert.equal(merchantPresentMode.pointOfInitiationMethod?.length, 2);
    assert.equal(merchantPresentMode.pointOfInitiationMethod?.value, '11');
  });

  it('#testSuccessDecodeMerchantCategoryCode', () => {
    const merchantPresentMode = DecoderMpm.decode('52044111', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.merchantCategoryCode);
    assert.equal(merchantPresentMode.merchantCategoryCode?.tag, '52');
    assert.equal(merchantPresentMode.merchantCategoryCode?.length, 4);
    assert.equal(merchantPresentMode.merchantCategoryCode?.value, '4111');
  });

  it('#testSuccessDecodeTransactionCurrency', () => {
    const merchantPresentMode = DecoderMpm.decode('5303156', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.transactionCurrency);
    assert.equal(merchantPresentMode.transactionCurrency?.tag, '53');
    assert.equal(merchantPresentMode.transactionCurrency?.length, 3);
    assert.equal(merchantPresentMode.transactionCurrency?.value, '156');
  });

  it('#testSuccessDecodeTransactionAmount', () => {
    const merchantPresentMode = DecoderMpm.decode('540523.72', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.transactionAmount);
    assert.equal(merchantPresentMode.transactionAmount?.tag, '54');
    assert.equal(merchantPresentMode.transactionAmount?.length, 5);
    assert.equal(merchantPresentMode.transactionAmount?.value, '23.72');
  });

  it('#testSuccessDecodeTipOrConvenienceIndicator', () => {
    const merchantPresentMode = DecoderMpm.decode('550201', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.tipOrConvenienceIndicator);
    assert.equal(merchantPresentMode.tipOrConvenienceIndicator?.tag, '55');
    assert.equal(merchantPresentMode.tipOrConvenienceIndicator?.length, 2);
    assert.equal(merchantPresentMode.tipOrConvenienceIndicator?.value, '01');
  });

  it('#testSuccessDecodeValueOfConvenienceFeeFixed', () => {
    const merchantPresentMode = DecoderMpm.decode('5603500', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.valueOfConvenienceFeeFixed);
    assert.equal(merchantPresentMode.valueOfConvenienceFeeFixed?.tag, '56');
    assert.equal(merchantPresentMode.valueOfConvenienceFeeFixed?.length, 3);
    assert.equal(merchantPresentMode.valueOfConvenienceFeeFixed?.value, '500');
  });

  it('#testSuccessDecodeValueOfConvenienceFeePercentage', () => {
    const merchantPresentMode = DecoderMpm.decode('57015', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.valueOfConvenienceFeePercentage);
    assert.equal(merchantPresentMode.valueOfConvenienceFeePercentage?.tag, '57');
    assert.equal(merchantPresentMode.valueOfConvenienceFeePercentage?.length, 1);
    assert.equal(merchantPresentMode.valueOfConvenienceFeePercentage?.value, '5');
  });

  it('#testSuccessDecodeCountryCode', () => {
    const merchantPresentMode = DecoderMpm.decode('5802CN', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.countryCode);
    assert.equal(merchantPresentMode.countryCode?.tag, '58');
    assert.equal(merchantPresentMode.countryCode?.length, 2);
    assert.equal(merchantPresentMode.countryCode?.value, 'CN');
  });

  it('#testSuccessDecodeMerchantName', () => {
    const merchantPresentMode = DecoderMpm.decode('5914BEST TRANSPORT', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.merchantName);
    assert.equal(merchantPresentMode.merchantName?.tag, '59');
    assert.equal(merchantPresentMode.merchantName?.length, 14);
    assert.equal(merchantPresentMode.merchantName?.value, 'BEST TRANSPORT');
  });

  it('#testSuccessDecodeMerchantCity', () => {
    const merchantPresentMode = DecoderMpm.decode('6007BEIJING', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.merchantCity);
    assert.equal(merchantPresentMode.merchantCity?.tag, '60');
    assert.equal(merchantPresentMode.merchantCity?.length, 7);
    assert.equal(merchantPresentMode.merchantCity?.value, 'BEIJING');
  });

  it('#testSuccessDecodePostalCode', () => {
    const merchantPresentMode = DecoderMpm.decode('61071234567', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.postalCode);
    assert.equal(merchantPresentMode.postalCode?.tag, '61');
    assert.equal(merchantPresentMode.postalCode?.length, 7);
    assert.equal(merchantPresentMode.postalCode?.value, '1234567');
  });

  it('#testSuccessDecodeCRC', () => {
    const merchantPresentMode = DecoderMpm.decode('6304A13A', MerchantPresentedMode);

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.CRC);
    assert.equal(merchantPresentMode.CRC?.tag, '63');
    assert.equal(merchantPresentMode.CRC?.length, 4);
    assert.equal(merchantPresentMode.CRC?.value, 'A13A');
  });

  it('#testSuccessDecodeAdditionalDataFieldTemplate', () => {
    const merchantPresentMode = DecoderMpm.decode(
      '6233030412340603***0708A60086670902ME',
      MerchantPresentedMode,
    );

    assert.isOk(merchantPresentMode);

    assert.isOk(merchantPresentMode.additionalDataField);
    assert.equal(merchantPresentMode.additionalDataField?.tag, '62');
    assert.equal(merchantPresentMode.additionalDataField?.length, 33);
    assert.isOk(merchantPresentMode.additionalDataField?.value);

    assert.isOk(merchantPresentMode.additionalDataField?.value?.storeLabel);
    assert.equal(merchantPresentMode.additionalDataField?.value?.storeLabel?.tag, '03');
    assert.equal(merchantPresentMode.additionalDataField?.value?.storeLabel?.length, 4);
    assert.equal(merchantPresentMode.additionalDataField?.value?.storeLabel?.value, '1234');

    assert.isOk(merchantPresentMode.additionalDataField?.value?.customerLabel);
    assert.equal(merchantPresentMode.additionalDataField?.value?.customerLabel?.tag, '06');
    assert.equal(merchantPresentMode.additionalDataField?.value?.customerLabel?.length, 3);
    assert.equal(merchantPresentMode.additionalDataField?.value?.customerLabel?.value, '***');

    assert.isOk(merchantPresentMode.additionalDataField?.value?.terminalLabel);
    assert.equal(merchantPresentMode.additionalDataField?.value?.terminalLabel?.tag, '07');
    assert.equal(merchantPresentMode.additionalDataField?.value?.terminalLabel?.length, 8);
    assert.equal(merchantPresentMode.additionalDataField?.value?.terminalLabel?.value, 'A6008667');

    assert.isOk(merchantPresentMode.additionalDataField?.value?.additionalConsumerDataRequest);
    assert.equal(
      merchantPresentMode.additionalDataField?.value?.additionalConsumerDataRequest?.tag,
      '09',
    );
    assert.equal(
      merchantPresentMode.additionalDataField?.value?.additionalConsumerDataRequest?.length,
      2,
    );
    assert.equal(
      merchantPresentMode.additionalDataField?.value?.additionalConsumerDataRequest?.value,
      'ME',
    );
  });

  it('#testSuccessDecodeMerchantInformationLanguageTemplate', () => {
    const merchantPresentMode = DecoderMpm.decode(
      '64200002ZH0104最佳运输0202北京',
      MerchantPresentedMode,
    );

    assert.isOk(merchantPresentMode);
    assert.isOk(merchantPresentMode.merchantInformationLanguage);
    assert.equal(merchantPresentMode.merchantInformationLanguage?.tag, '64');
    assert.equal(merchantPresentMode.merchantInformationLanguage?.length, 20);
    assert.isOk(merchantPresentMode.merchantInformationLanguage?.value);

    assert.isOk(merchantPresentMode.merchantInformationLanguage?.value?.languagePreference);
    assert.equal(
      merchantPresentMode.merchantInformationLanguage?.value?.languagePreference?.tag,
      '00',
    );
    assert.equal(
      merchantPresentMode.merchantInformationLanguage?.value?.languagePreference?.length,
      2,
    );
    assert.equal(
      merchantPresentMode.merchantInformationLanguage?.value?.languagePreference?.value,
      'ZH',
    );

    assert.isOk(merchantPresentMode.merchantInformationLanguage?.value?.merchantName);
    assert.equal(merchantPresentMode.merchantInformationLanguage?.value?.merchantName?.tag, '01');
    assert.equal(merchantPresentMode.merchantInformationLanguage?.value?.merchantName?.length, 4);
    assert.equal(
      merchantPresentMode.merchantInformationLanguage?.value?.merchantName?.value,
      '最佳运输',
    );

    assert.isOk(merchantPresentMode.merchantInformationLanguage?.value?.merchantCity);
    assert.equal(merchantPresentMode.merchantInformationLanguage?.value?.merchantCity?.tag, '02');
    assert.equal(merchantPresentMode.merchantInformationLanguage?.value?.merchantCity?.length, 2);
    assert.equal(
      merchantPresentMode.merchantInformationLanguage?.value?.merchantCity?.value,
      '北京',
    );
  });

  it('#testeSuccessToString', () => {
    const encoded =
      '00020101021102160004hoge0104abcd520441115303156540523.725502015603500570155802CN5914BEST TRANSPORT6007BEIJING6107123456762950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京0204最佳运输0304abcd65020080320016A01122334499887707081234567863044220';

    const merchantPresentMode = DecoderMpm.decode(encoded, MerchantPresentedMode);

    assert.equal(merchantPresentMode.toString().length, 301);
    assert.equal(
      merchantPresentMode.toString(),
      '00020101021102160004hoge0104abcd520441115303156540523.725502015603500570155802CN5914BEST TRANSPORT6007BEIJING6107123456762950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京0204最佳运输0304abcd65020080320016A01122334499887707081234567863044220',
    );
  });

  it('#testeSuccessToStringWithoutCRC', () => {
    const encoded =
      '00020101021102160004hoge0104abcd520441115303156540523.725502015603500570155802CN5914BEST TRANSPORT6007BEIJING6107123456762950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京0204最佳运输0304abcd65020080320016A011223344998877070812345678';

    const merchantPresentMode = DecoderMpm.decode(encoded, MerchantPresentedMode);

    assert.equal(merchantPresentMode.toString().length, 301);
    assert.equal(
      merchantPresentMode.toString(),
      '00020101021102160004hoge0104abcd520441115303156540523.725502015603500570155802CN5914BEST TRANSPORT6007BEIJING6107123456762950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京0204最佳运输0304abcd65020080320016A01122334499887707081234567863044220',
    );
  });

  it('#testFailDecode', () => {
    const encoded1 =
      '00020101021102160004hoge0104abcd5204411153031565303156540523.725502015603500570155802CN5914BEST TRANSPORT6007BEIJING6107123456762950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京0204最佳运输0304abcd65020080320016A011223344998877070812345678';
    expect(() => DecoderMpm.decode(encoded1, MerchantPresentedMode))
      .to.throw(DuplicateTagException)
      .that.satisfies(
        (error: DuplicateTagException) => error.value === '5303156' && error.tag === '53',
      );

    const encoded2 =
      '00020101021102160004hoge0104abcd52044111AA031565303156540523.725502015603500570155802CN5914BEST TRANSPORT6007BEIJING6107123456762950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京0204最佳运输0304abcd65020080320016A011223344998877070812345678';
    expect(() => DecoderMpm.decode(encoded2, MerchantPresentedMode))
      .to.throw(InvalidTagException)
      .that.satisfies(
        (error: InvalidTagException) => error.value === 'AA03156' && error.tag === 'AA',
      );
  });

  it('#testeBrCode', () => {
    const encoded1 =
      '00020126570014BR.GOV.BCB.PIX0114607011900001040217Mensagem opcional52040000530398654041.225802BR5920Teste Batch atualiza6009SAO PAULO622605221t9OGEuUWlqWQiY0CU2YmA63048179';
    const encoded2 =
      '00020126830014br.gov.bcb.pix01364004901d-bd85-4769-8e52-cb4c42c506dc0221Jornada pagador 57768520400005303986540573.625802BR5903Pix62080504oooo63048E87';
    const encoded3 =
      '00020126830014br.gov.bcb.pix01364004901d-bd85-4769-8e52-cb4c42c506dc0221Jornada pagador 57768520400005303986540573.625802BR5903Pix6016Sao Joao del Rei62080504oooo63044682';
    const encoded4 =
      '00020104141234567890123426580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-42665544000027300012BR.COM.OUTRO011001234567895204000053039865406123.455802BR5917NOME DO RECEBEDOR6008BRASILIA61087007490080390012BR.COM.OUTRO01190123.ABCD.3456.WXYZ6304549C';
    const encoded5 =
      '00020126830014br.gov.bcb.pix01364004901d-bd85-4769-8e52-cb4c42c506dc0221Jornada pagador 57768520400005303986540105802BR5903Pix6008BRASILIA62080504oooo63041F70';

    assert.doesNotThrow(() => DecoderMpm.decode(encoded1, MerchantPresentedMode));
    assert.doesNotThrow(() => DecoderMpm.decode(encoded2, MerchantPresentedMode));
    assert.doesNotThrow(() => DecoderMpm.decode(encoded3, MerchantPresentedMode));
    assert.doesNotThrow(() => DecoderMpm.decode(encoded4, MerchantPresentedMode));
    assert.doesNotThrow(() => DecoderMpm.decode(encoded5, MerchantPresentedMode));
  });
});
