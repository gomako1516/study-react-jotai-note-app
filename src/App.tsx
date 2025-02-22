import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { notesAtom } from './store'
import SideMenu from './components/SideMenu'
import Editor from './components/Editor'
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import { Note } from './domain/note'

function App() {
  // useSetAtom()
  // 状態（Atom）の更新用関数を取得するフック
  // 関数を実行することで、状態が新しい値に変わる

  // 値を'更新する'だけで、値の'取得はしない'のがポイント
  // 値を取得するためにはuseAtomValue()を使用する

  // notesAtomを更新する関数を取得
  const setNotes = useSetAtom(notesAtom)

  // サーバのgetクエリを呼び出し、データを取得
  // useQuery()を使うことで、リアルタイムにデータを取得できる
  const initializeNotes = useQuery(api.notes.get)

  useEffect(() => {
    // 取得したデータをNoteクラスに変換
    // initializeNotesで取得したデータが変わるたびに、Noteクラスに変換し、setNotes()で状態を更新する
    const notes = initializeNotes?.map((note) => new Note(note._id, note.title, note.content, note.lastEditTime))

    // 取得したデータをJotai（notesAtom）の更新用関数に保存
    setNotes(notes || [])
  }, [setNotes, initializeNotes])
  // setNotes、initializeNotesが変化した時に再実行
  // setNotes：再実行のトリガーにならないが、setter関数を依存配列に入れることが推奨されている
  // initializeNotes：非同期にデータが変化する→変化を検知してuseEffectを再実行する必要がある

  return (
    <>
      <div className='flex h-screen w-full bg-white'>
        <SideMenu />
        <Editor />
      </div>
    </>
  )
}

export default App
