import { useAtom } from 'jotai'
import { notesAtom } from '../store'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Note } from '../domain/note'
import { Id } from '../../convex/_generated/dataModel'

const SideMenu = () => {

  // useAtomValue()
  // 状態（Atom）の値を取得するためのフック
  // notesAtomの値が変更されると、再レンダリングされ、最新の値が反映される
  // 更新したい場合はuseSetAtomで更新用関数を取得する

  // 状態（Atom）を取得するための関数
  // notes：現在の値（状態）
  // setState：状態を更新するための関数
  const [notes, setNotes] = useAtom(notesAtom)

  // データをインサート（追加）する関数「create」を呼び出す
  const createNote = useMutation(api.notes.create)

  // データを削除する関数「deleteNote」を呼び出す
  const deleteNote = useMutation(api.notes.deleteNote)

  // データを追加する処理
  const handleCreateNote = async () => {
    const noteId = await createNote({
      title: 'Untitled',
      content: ''
    })

    // クラス「Note」を使用して、新しいメモのオブジェクトを作成
    const newNote = new Note(noteId, 'Untitled', '', Date.now())

    // noteAtomの値を更新→再レンダリングされる
    setNotes((prev) => [...prev, newNote])
  }

  // データを削除する処理
  const handleDeleteNote = async (noteId: Id<'notes'>) => {
    await deleteNote({ noteId })
    setNotes((prev) => prev.filter((n) => n.id !== noteId))
  }

  return (
    <div className='w-64 h-screen bg-gray-100 p-4 flex flex-col'>
      <div>
        <h2>Notes</h2>
        <button onClick={handleCreateNote}>+</button>
      </div>
      <div>
        {notes?.map((note) => (
          <div
            key={note.id}
            className='p-2 mb-2 rounded cursor-pointer flex justify-between items-center group'
          >
            <div className='flex-1 min-w-0'>
              <input type='text' className='bg-gray-10' value={note.title} />
              <p>
                {
                  note.lastEditTime
                    ? new Date(note.lastEditTime).toLocaleString()
                    : 'Never edited'
                }
              </p>
            </div>
            <button onClick={() => handleDeleteNote(note.id)}>-</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideMenu
