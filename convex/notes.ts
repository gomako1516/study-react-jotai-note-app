import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// query
// データを取得する処理を定義
// データベースの"note"テーブルからデータを取得するAPIを作成
// 対して、データを変更する処理はmutationで定義する

// ctx
// コンテキスト（clientに追加したConvexのクライアント）
// データベースからデータを簡単に取得できる

export const get = query({ // フロント側からapi.notes.getを通じてこの関数を呼び出せる
  args: {},
  handler: async (ctx) => {
    const notesJson = await ctx.db.query('notes').collect() // データを取得
    return notesJson
  }
})

// mutation
// データを変更（追加・更新・削除）する処理を定義
// 今回はデータを「追加するAPI」を作成する
// 対して、データを取得する処理はqueryで定義する

// args
// 定義したデータ変更用関数が受け取るパラメータを定義する
// v.string()とすることで型定義できる

// handlerで必要な処理を設定

// ctx.db.insert
// 引数に指定したテーブルに新しいデータを追加する

// Convexにデータを追加
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string()
  },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert('notes', { // データを追加
      title: args.title,
      content: args.content,
      lastEditTime: Date.now() // 現在の時間（ミリ秒）を保存
    })

    // async/awaitで非同期処理にすることで、データが挿入されるまで待機
    // 作成されたメモのIDを返す
    return noteId
  }
})