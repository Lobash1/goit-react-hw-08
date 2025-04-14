import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { createSelector } from "reselect";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetContacts: (state) => {
      state.items = []; // очищаємо список контактів
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add contact
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetContacts } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export const selectError = (state) => state.contacts.error;
export const selectLoading = (state) => state.contacts.loading;

// Мемоізований селектор для фільтрації контактів
export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items, (state) => state.filters.name], // залежності
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

// Експортуємо асинхронні дії окремо
export { addContact, deleteContact };

export default contactsSlice.reducer;
