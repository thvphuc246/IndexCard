import { MdDeleteForever } from "react-icons/md";

export interface NoteProps {
  id: string;
  text: string;
  date: string;
  handleDeleteNote: (id: string) => void;
}

const Note: React.FunctionComponent<NoteProps> = ({
  id,
  text,
  date,
  handleDeleteNote
}) => {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
