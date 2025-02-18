import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { notesAtom } from './store'
import SideMenu from './components/SideMenu'
import Editor from './components/Editor'

function App() {
  // useSetAtom()
  // 状態（Atom）の更新用関数を取得するフック
  // 関数を実行することで、状態が新しい値に変わる

  // 値を'更新する'だけで、値の'取得はしない'のがポイント
  // 値を取得するためにはuseAtomValue()を使用する

  const setNotes = useSetAtom(notesAtom) // notesAtomを更新する関数を取得

  const noteData = [
    {
      id: '1',
      title: 'Note 1',
      content: 'Content 1',
      lastEditTime: new Date().getTime()
    },
    {
      id: '2',
      title: 'Note 2',
      content: 'Content 2',
      lastEditTime: new Date().getTime()
    },
    {
      id: '3',
      title: 'Note 3',
      content: 'Content 3',
      lastEditTime: new Date().getTime()
    },
  ]

  useEffect(() => {
    setNotes(noteData) // 初回マウント時にデータをAtomにセット
  }, [noteData])

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
