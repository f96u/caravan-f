export const assets = [
  'イオン銀行',
  '千葉銀行',
  '現金',
  '福井立替金',
  'ゆみ立替金',
  '積立金',
]

export const liabilities = [
  'イオンカード',
  'dカード',
  'WAON',
  'WAON(ゆみ)',
  '福井現金',
  'ゆみ現金',
  '福未払い',
  'ゆみ未払い',
]

export const expenditure = [
  '食費・消耗品費',
  '外食費',
  '旅費交通費',
  '生活設備費',
  '電気・ガス・水道',
  '診療費',
  '薬代',
  '新聞図書費',
  '通信費',
  '保険料',
  '奨学金返済',
  '保育費',
  '雑費',
  '租税公課',
  '小遣い',
  '福利厚生費',
  '雑損失',
  '特別支出',
]

export const revenue = [
  '福井給与',
  'ゆみ給与',
  '雑収入',
]

export const accounts = [
  ...assets,
  ...liabilities,
  ...expenditure,
  ...revenue,
]
