// useState

const uiStates = {
  isActive: "isActive",
  isClosed: "isClosed",
  isClosing: "isClosing",
  isCreating: "isCreating",
  isEditing: "isEditing",
  isHidden: "isHidden",
  isLoading: "isLoading",
  isUpdating: "isUpdating",
} as const;

type UiState = typeof uiStates[keyof typeof uiStates]

type NoInfer<T> = [T][T extends any ? 0 : never];

function includes<T extends UiState>(state: T, states: NoInfer<T>[]): boolean {
  return states.includes(state);
}

type IsEditing = typeof uiStates.isUpdating | typeof uiStates.isCreating;

const isEditing = (state: UiState): state is IsEditing => {
  return includes(state, ["isUpdating", "isCreating", "whoops"]);
}
