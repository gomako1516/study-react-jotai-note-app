import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// ConvexでAPIを作成する流れ
// 1. argsでデータを受け取る。
// 2. handlerの引数にctxとargsを指定する。
// 3. handlerでDB操作の処理を定義する。

// query
// データを取得する処理を定義
// データベースの"note"テーブルからデータを取得するAPIを作成
// 対して、データを変更する処理はmutationで定義する

// mutation
// データを変更（追加・更新・削除）する処理を定義
// 今回はデータを「追加するAPI」を作成する
// 対して、データを取得する処理はqueryで定義する

// handler
// mutationやqueryでデータベースを操作（CRUD）する関数を定義する
// crx（コンテキスト）：DB操作用のオブジェクト。ctx.dbでDBの読み書きができる。
// args（引数）：クライアントから渡されたデータ。args.noteIdのように、値を取得して処理する。

// args
// 定義したデータ変更用関数が受け取るパラメータを定義する
// v.string()とすることで型定義できる

// ctx
// コンテキスト（clientに追加したConvexのクライアント）
// データベースからデータを簡単に取得できる

// ctx.db.insert
// 引数に指定したテーブルに新しいデータを追加する

// v.id('notes')
// v.string()にすると型不一致のエラーになる。
// ConvexのDBのIDは「id」という特別な型になっているため。

// ----------------------------------------------------------- //

// 全てのデータを取得する
export const get = query({ // フロント側からapi.notes.getを通じてこの関数を呼び出せる
  args: {},
  handler: async (ctx) => {
    const notesJson = await ctx.db.query('notes').collect() // 全てのデータを取得
    return notesJson
  }
})

// データを追加する
export const create = mutation({
  args: {
    // 追加するデータをcreate()の引数として受け取る
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

// データを削除
export const deleteNote = mutation({
  args: {
    // 削除対象のIDをdeleteNote()の引数として受け取る
    noteId: v.id('notes')
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.noteId)
  }
})