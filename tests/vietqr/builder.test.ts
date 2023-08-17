import { assert } from "chai";
import {Consumer, Country, Currency, VNBank, VietQRBuilder} from "../.build"

describe('VietQRBUilderTest', () => {
  describe("#testSuccessToString", () => {
    it('should generate string "00020101021238510010A00000072701210006970432010789477750208QRIBFTTA53037045408888888.35802VN62120808Transfer6304388B" ', () => {
      const consumer = new Consumer(VNBank.VPBank.bin, '8947775', Currency.VND.code, Country.VN.alpha2);
      consumer.amount = 888888.3
      consumer.message = 'Transfer'
      const builder = new VietQRBuilder(consumer);
      
      assert.equal(builder.toString(), "00020101021238510010A00000072701210006970432010789477750208QRIBFTTA53037045408888888.35802VN62120808Transfer6304388B")
    })
  })
  
  describe('#testThrowErrorWithNoValidConsumer', () => {
    it("should throw error invalid Bank", () => {
      const consumer = new Consumer('1234', '8947775', Currency.VND.code, Country.VN.alpha2);
      const builder = new VietQRBuilder(consumer);  
      assert.throws(() => builder.toString(), TypeError, "Bank 1234 not available. Please refer to VNBank enum")
    })
    it("should throw error invalid Currency", () => {
      const consumer = new Consumer(VNBank.VPBank.bin, '8947775', '1234', Country.VN.alpha2);
      const builder = new VietQRBuilder(consumer);  
      assert.throws(() => builder.toString(), TypeError, "Currency 1234 not available. Please refer to Currency enum")
    })
    it("should throw error invalid Country", () => {
      const consumer = new Consumer(VNBank.VPBank.bin, '8947775', Currency.VND.code, 'ab');
      const builder = new VietQRBuilder(consumer);  
      assert.throws(() => builder.toString(), TypeError, "Country ab not available. Please refer to Country enum")
    })
  })
})
