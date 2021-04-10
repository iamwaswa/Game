import { ChangeEvent, FormEvent, useState } from "react"

interface IUseAddUser {
  displayName: string;
  handleAddUser: (event: FormEvent) => void,
  handleDisplayNameChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

/**
 * Manages the add user state.
 * @param addUser A callback to add the user
 * @returns The add user state
 */
export function useAddUser(addUser: (displayName: string) => void): IUseAddUser {
  const [displayName, setDisplayName] = useState<string>(``);

  function handleDisplayNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setDisplayName(event.target.value);
  }

  function handleAddUser(event: FormEvent): void {
    event.preventDefault();
    
    if (!displayName) {
      return alert(`Display name is required!`);
    }
    
    addUser(displayName);
  }

  return {
    displayName,
    handleAddUser,
    handleDisplayNameChange,
  };
}