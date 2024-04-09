# Caravan

# 開発
## デプロイ
`$npm run deploy`
デプロイ先はこちら
https://caravan-f.web.app/

## エミュレーター
`$npm run emulators`
エミュレーターのシード値は`/emulator-data`にある。これをインポートするように設定されている。
起動中のemulator内部データのエクスポートは以下のコマンドを使う。
`$firebase emulators:export ./emulator-data --project caravan-f`
