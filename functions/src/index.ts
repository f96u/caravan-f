import * as admin from 'firebase-admin'

admin.initializeApp()

// NOTE: firestoreに保存している時刻データをグリニッジ標準時で取得してしまうため、標準で日本標準時を取得するようにタイムゾーンを設定する。
process.env.TZ = 'Asia/Tokyo'
export {calcBalance} from './calcBalance'
