import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalContent {
  type: string;
  props: Record<string, any>;
}

interface ModalState {
  isVisible: boolean;
  title?: string;
  content?: ModalContent;
}

const initialState: ModalState = {
  isVisible: false,
  title: undefined,
  content: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<{ title?: string; content?: ModalContent }>) => {
      state.isVisible = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    hideModal: (state) => {
      state.isVisible = false;
      state.title = undefined;
      state.content = undefined;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer; 