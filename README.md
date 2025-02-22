状態管理ライブラリ「Jotai」のハンズオンアプリ。
https://qiita.com/Sicut_study/items/ee41f1bb59fcda45a50b

# Convex
https://dashboard.convex.dev/t/gomako1516
バックエンドサービス「Convex」を使い、データベースを作成し、Reactアプリに表示させる。
TypeScriptで実装できる人気のライブラリ。

## 手順
1. アカウント作成。
2. `$ npm i convex`を実行。
3. ダッシュボードにプロジェクトが作成される。
4. DBの接続情報が.env.localに作成され、convexディレクトリも作成される。
5. DBのスキーマを`convex/schema.ts`に作成。`npx convex dev`の起動中、自動的に変更が反映される。
6. ダッシュボードに仮のデータを作成。
7. データを取得・表示。

## npx convex dev
バックエンドとAPIをローカル上で動かす。
convexディレクトリ内のファイルを編集が自動的に反映される。