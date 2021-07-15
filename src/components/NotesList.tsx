import Note from "./Note";
import AddNote from "./AddNote";

export interface NotesListProps {
  notes: note[];
  handleAddNote: (noteText: string) => void;
  handleDeleteNote: (id: string) => void;
}

const NotesList: React.FunctionComponent<NotesListProps> = ({
  notes,
  handleAddNote,
  handleDeleteNote
}) => {
  return (
    <div className="notes-list">
      {notes.map(note => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
