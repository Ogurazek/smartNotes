import { create } from "zustand"

type Note = {
  id: string
  titulo: string
  content: string
  result_ia?: string
}

type NotesStore = {
  selectedNote: Note | null
  setSelectedNote: (note: Note | null) => void
  updateNote: (note: Note) => void
}

export const useNotesStore = create<NotesStore>((set) => ({
  selectedNote: null,
  setSelectedNote: (note) => set({ selectedNote: note }),
  updateNote: (note) => set({ selectedNote: note }), 
}))
