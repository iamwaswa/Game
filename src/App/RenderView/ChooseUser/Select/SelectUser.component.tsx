import { ChangeEvent, FormEvent } from "react";

import { User } from "../../../../types";

interface ISelectUserProps {
  selectedUser: number;
  users: Array<User>;
  handleSelectedUserChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSelectUser: (event: FormEvent<HTMLFormElement>) => void;
}

export function SelectUser({ 
  selectedUser,
  users,
  handleSelectedUserChange,
  handleSelectUser, 
}: ISelectUserProps): JSX.Element {
  return (
    <div className="select">
      <h3 className="subtitle">Select the user you would like to use</h3>
      <form onSubmit={handleSelectUser}>
        <label htmlFor="selectUser">Select user</label>
        <select 
          id="selectUser" 
          name="selectedUser"
          value={selectedUser} 
          onChange={handleSelectedUserChange} 
        >
          <option>None</option>
          {users
            .sort((user, otherUser) => user.id - otherUser.id)
            .map(user => (
              <option key={user.id} value={user.id}>{user.displayName}</option>
            ))
          }
        </select>
        <button className="play" type="submit">Play!</button>
      </form>
    </div>
  );
}