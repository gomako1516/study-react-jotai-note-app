import { query } from './_generated/server'

// query
// GETメソッド
// データベースの"note"テーブルからデータを取得するAPIを作成。

// mutation
// POST,PUT,PATCH,DELETEメソッド

// ctx
// コンテキスト（clientに追加したConvexのクライアント）。
// データベースからデータを簡単に取得できる。

export const get = query({ // フロント側からapi.notes.getを通じてこの関数を呼び出せる
  args: {},
  handler: async(ctx) => {
    const notesJson = await ctx.db.query('notes').collect() // データを取得
    return notesJson
  }
})