import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// スキーマを定義
// スキーマとは、DBに保存されるデータの構造を定義するもの
// defineSchema()を使用する
// フィールド名: 型（v.●●()）

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    content: v.string(),
    lastEditTime: v.number(),
  })
})