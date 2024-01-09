import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.phonebook.contacts;
export const selectIsLoading = state => state.phonebook.isLoading;
export const selectError = state => state.phonebook.error;
export const selectContactsFilter = state => state.phonebook.filter;

export const selectFilterContacts = createSelector([selectContacts, selectContactsFilter],
    (contacts, filter) => contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase().trim())));
    