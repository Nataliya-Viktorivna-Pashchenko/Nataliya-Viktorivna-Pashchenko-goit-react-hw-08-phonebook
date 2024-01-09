import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://connections-api.herokuapp.com/',
  });

const setToken = token => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loginThunk = createAsyncThunk (
    'auth/login',
    async (formData, thunkApi) => {
        try{
            const { data } = await instance.post('/users/login', formData);
            console.log('data: ', data);

            setToken(data.token);
            return data;
        }
        catch (err){
            return thunkApi.rejectWithValue(err.message);
        }
    }
)

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (formData, thunkApi) => {
        console.log('formData: ', formData);
              try {
        const { data } = await instance.post('/users/signup', formData);
        console.log('data: ', data);
        
        setToken(data.token);
  
        return data;
      } catch (err) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );

  export const refreshThunk = createAsyncThunk(
    'auth/refresh',
    async (_, thunkApi) => {
              try {
                const state = thunkApi.getState();
                const token = state.auth.token;
                setToken(token);
        const { data } = await instance.get('/users/current');
        console.log('data: ', data);
        
        setToken(data.token);
  
        return data;
      } catch (err) {
        return thunkApi.rejectWithValue(err.message);
      }
    },
   
  );

  export const logOutThunk = createAsyncThunk(
    'auth/logOut',
    async (_, thunkApi) => {
      try {
        const state = thunkApi.getState();
        const token = state.auth.token;
        setToken(token);
        const { data } = await instance.post('/users/logout');
  
        return data;
      } catch (err) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    authenticated: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder =>
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = payload.token;
        state.userData = payload.user;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = payload.token;
        state.userData = payload.user;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = payload;
      })
      .addCase(logOutThunk.fulfilled, () => {
       return initialState;
      })
      .addMatcher(
        isAnyOf(
          loginThunk.pending,
          registerThunk.pending,
          refreshThunk.pending,
          logOutThunk.pending,
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected,
          refreshThunk.rejected,
          logOutThunk.rejected,
                  ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const authReducer = authSlice.reducer;