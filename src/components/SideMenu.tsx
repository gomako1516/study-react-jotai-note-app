import { useAtomValue } from 'jotai'
import { notesAtom } from '../store'

const SideMenu = () => {

  // useAtomValue()
  // 状態（Atom）の値を取得するためのフック
  // notesAtomの値が変更されると、再レンダリングされ、最新の値が反映される
  // 更新したい場合はuseSetAtomで更新用関数を取得する

  const notes = useAtomValue(notesAtom) // notesAtomの現在の値を取得

  return (
    <div className='w-64 h-screen bg-gray-100 p-4 flex flex-col'>
      <div>
        <h2>Notes</h2>
        <button>+</button>
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
            <button>-</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideMenu
