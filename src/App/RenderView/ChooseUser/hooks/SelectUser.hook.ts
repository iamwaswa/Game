import { ChangeEvent, FormEvent, useState } from "react"

interface IUseSelectUser {
  selectedUser: number;
  handleSelectUser: (event: FormEvent<HTMLFormElement>) => void,
  handleSelectedUserChange: (event: ChangeEvent<HTMLSelectElement>) => void,
}

/**
 * Manages the select user state.
 * @param selectUser A callback to select the user
 * @returns The select user state
 */
export function useSelectUser(
  selectUser: (userId: number) => void
): IUseSelectUser {
  const [selectedUser, setSelectedUser] = useState<number>(0);

  function handleSelectedUserChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedUser(Number(event.target.value));
  }

  function handleSelectUser(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    
    const userId = formData.get(`selectedUser`);

    if (!userId) {
      return alert(`Display name is required!`);
    }
    
    selectUser(Number(userId));
  }

  return {
    selectedUser,
    handleSelectUser,
    handleSelectedUserChange,
  };
}