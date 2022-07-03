import { useDispatch } from "react-redux";
import { editFriend, deleteFriend } from "../../redux/friends";
import { useState } from "react";
import { Friend } from "../../types";

interface Props {
  id: number;
  friend: Friend;
}

export function FriendCard(props: Props) {
  const { id, friend } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  const [name, setName] = useState(friend.name);
  const [expense, setExpense] = useState(friend.expense);

  const dispatch = useDispatch();

  const handleSave = (event: any) => {
    // event.preventDefault();

    dispatch(editFriend({ id, friend: { name, expense } }));
    setIsEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteFriend({ id }));
  };

  return (
    <>
      {isEditMode ? (
        <form className="friend-card" onSubmit={handleSave}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="number"
            value={expense}
            onChange={(event) => setExpense(parseInt(event.target.value))}
          />

          <button type="submit">
            <i className="fa-solid fa-check"></i>
          </button>

          <button type="button" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </form>
      ) : (
        <div className="friend-card">
          <h5>{friend.name}</h5>
          <p>{friend.expense}</p>

          <button onClick={() => setIsEditMode(true)}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      )}
    </>
  );
}
