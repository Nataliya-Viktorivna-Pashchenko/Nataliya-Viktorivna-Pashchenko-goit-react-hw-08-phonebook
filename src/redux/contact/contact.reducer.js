import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { instance } from "../auth/auth.reducer";

const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getContactsThunk = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      setToken(thunkApi.getState().auth.token);
      const { data } = await instance.get('/contacts');
      console.log('data: ', data);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addContactsThunk = createAsyncThunk(
  'contacts/add',
  async (contact, thunkApi) => {

    try {
      
      setToken(thunkApi.getState().auth.token);
      const { data } = await instance.post('/contacts', contact);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteContactsThunk = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkApi) => {

    try {
      
      setToken(thunkApi.getState().auth.token);
      const { data } = await instance.delete(`/contacts/${contactId}`);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
const initialState = {
contacts: [],
isLoading: false,
error: null,
filter:'',
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
       
    changeFilter(state, { payload }) {
      state.filter = payload;
    },
  },

  extraReducers: builder =>
    builder
    .addCase(getContactsThunk.fulfilled,(state, {payload}) => {
      state.isLoading = false;
      state.contacts = payload;
    })
    .addCase(addContactsThunk.fulfilled,(state, {payload}) => {
      state.isLoading = false;
      state.contacts = [...state.contacts, payload];
    })
    .addCase(deleteContactsThunk.fulfilled,(state, {payload}) => {
      state.isLoading = false;
      state.contacts = state.contacts.filter(contact => contact.id !== payload.id)
    })
    .addMatcher(
      isAnyOf(
        getContactsThunk.pending,
        addContactsThunk.pending,
        deleteContactsThunk.pending,
      ),
      state => {
        state.isLoading = true;
        state.error = null;
      }
    )
    .addMatcher(
      isAnyOf(
        getContactsThunk.rejected,
        addContactsThunk.rejected, 
        deleteContactsThunk.rejected,
                ),
      (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }
    ),
});

export const { changeFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

