import { atom } from 'jotai'
import { Note } from '../domain/note'

// Jotaiを定義
// atomを使用して状態を定義。初期値に空配列。

export const notesAtom = atom<Note[]>([]) // 状態「noteAtom」を定義

// noteAtomを更新したい → useSetAtom(noteAtom)
// noteAtomの値を取得したい → useAtomValue(noteAtom)