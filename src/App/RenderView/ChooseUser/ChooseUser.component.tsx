import { AddUser } from "./Add";
import { SelectUser } from "./Select";
import { User } from "../../../types";
import { useAddUser } from "./hooks"
import { useSelectUser } from "./hooks/SelectUser.hook";

interface IChooseUserProps {
  users: Array<User>;
  onUserAdded: (displayName: string) => void;
  onUserSelected: (userId: number) => void;
}

export function ChooseUser({ 
  users, 
  onUserAdded, 
  onUserSelected 
}: IChooseUserProps): JSX.Element {
  const { 
    displayName, 
    handleAddUser, 
    handleDisplayNameChange, 
  } = useAddUser(onUserAdded);

  const { 
    selectedUser, 
    handleSelectUser, 
    handleSelectedUserChange, 
  } = useSelectUser(onUserSelected);

  return (
    <div className="choose">
      <h1>Welcome to the game!</h1>
      <h2>You can either create a new user or select a user from existing ones</h2>
      <div className="options">
        <AddUser 
          displayName={displayName} 
          handleDisplayNameChange={handleDisplayNameChange} 
          handleAddUser={handleAddUser} 
          />
        <br />
        <hr />
        <SelectUser 
          selectedUser={selectedUser}
          users={users} 
          handleSelectedUserChange={handleSelectedUserChange} 
          handleSelectUser={handleSelectUser} 
        />
      </div>
    </div>
  );
}