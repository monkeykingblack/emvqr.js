// eslint-disable-next-line import/no-unresolved
import {crc16ccitt} from 'crc';

export default function crc(value: string) {
  return crc16ccitt(value).toString(16);
}
