import { ChangeEvent, FormEvent } from "react";

interface IAddUserProps {
  displayName: string;
  handleDisplayNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddUser: (event: FormEvent) => void;
}

export function AddUser({ 
  displayName, 
  handleDisplayNameChange, 
  handleAddUser, 
}: IAddUserProps): JSX.Element {
  return (
    <div className="add">
      <h3 className="subtitle">Enter the display name you would like to use</h3>
      <form onSubmit={handleAddUser}>
        <label htmlFor="displayName">Display name</label>
        <input 
          id="displayName" 
          placeholder="Enter the display name you would like to use" 
          value={displayName} 
          onChange={handleDisplayNameChange} 
        />
        <button className="play" type="submit">Play!</button>
      </form>
    </div>
  );
}