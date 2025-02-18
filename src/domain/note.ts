// Noteクラス

// クラスを定義する理由
// - データ構造を統一するため
// - 型安全にするため
// - 統一された構造の新しいデータ（インスタンス）を簡単に作成できる

// public
// クラスの外から値を自由に読み書きできるようになる

export class Note {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public lastEditTime: number,
  ) {}
}