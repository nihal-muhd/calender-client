import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../Config/axios'

export const userLogin = createAsyncThunk('user/userLogin', async (formData) => {
    const res = await axios.post('/login', formData)
    res.data.loggedIn = true
    return res
  })

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        rejected: false,
        fulfilled: false
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = null
        }
    },
     extraReducers: {
        [userLogin.pending]: (state, action) => {
          console.log('loading')
          state.loading = true
        },
        [userLogin.fulfilled]: (state, action) => {
          console.log(action.payload.data)
          localStorage.setItem('token', action.payload.data.token);
          state.user = action.payload.data
          state.fulfilled = true
          state.loading = false
        },
        [userLogin.rejected]: (state, action) => {
          console.log('rejected')
          state.rejected = true
          state.loading = false
        }
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer