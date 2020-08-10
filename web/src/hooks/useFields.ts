import { useState, ChangeEvent } from 'react';

type Response<T> = [
  T,
  (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void,
  () => void
];

export function useFields<T>(initialState: T): Response<T> {
  const [state, setState] = useState<T>(initialState);

  function handleFieldChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function clearFields() {
    setState(initialState);
  }

  return [state, handleFieldChange, clearFields];
}
