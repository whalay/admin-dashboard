import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

const UserTableRow = ({
  user,
  editState,
  handleSelectUser,
  handleEdit,
  handleSave,
  handleToggleEdit,
  handleEditChange,
  handleDeleteSelected
}) => {
  return (
    <tr key={user.id} className={`${user.isSelected ? "bg-gray-200 cursor-pointer" : "hover:bg-gray-200 cursor-pointer"}`}>
      <td>
        <input
          type="checkbox"
          checked={user.isSelected}
          onChange={() => handleSelectUser(user.id, !user.isSelected)}
          className="cursor-pointer"
        />
      </td>
      {editState[user.id] ? (
        <>
          <td>
            <input
              type="text"
              value={user.name}
              onChange={(event) => {handleEditChange(user.id, event.target.value, "name")}}
            />
          </td>
          <td>
            <input
              type="email"
              value={user.email}
              onChange={(event) => handleEditChange(user.id, event.target.value, "email")}
            />
          </td>
          <td>
            <input
              type="text"
              value={user.role}
              onChange={(event) => handleEditChange(user.id, event.target.value, "role")}
            />
          </td>
        </>
      ) : (
        <>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
        </>
      )}
   <td className="flex flex-row justify-center items-center gap-4">
      {editState[user.id] ? (
        <AiOutlineSave onClick={() => handleSave(user.id)} className="border   text-4xl  p-1"/>

      ) : (
        <div className="flex flex-row justify-center items-center gap-4">
            <FaRegEdit onClick={() => handleEdit(user.id)} className="border text-4xl  p-1" />
            <AiOutlineDelete onClick={() => handleDeleteSelected(user.id)} className="border text-red-400  text-4xl  p-1" />
          </div>
      )}
    </td>
    </tr>
  );
};

export default UserTableRow;
