import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import auth from "../../firebase/firebase.config"
import Login from '../../pages/Login'

const initialState = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: ""
}

// create user
export const createUser = createAsyncThunk("auth/createUser",
    async ({ email, password }) => {
        const data = await createUserWithEmailAndPassword(auth, email, password)
        return data.user.email;
    })

// sign in user
export const loginUser = createAsyncThunk("auth/loginUser",
    async ({ email, password }) => {
        const data = await signInWithEmailAndPassword(auth, email, password)
        return data.user.email;
    })

// sign in with google account
export const googleLoginUser = createAsyncThunk("auth/googleLogin",
    async () => {
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider)
        return data.user.email;
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.email = "";
        },
        setUser: (state, { payload }) => {
            state.email = payload;
            state.isLoading = false;
        },
        toggleLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // create user
            .addCase(createUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.email = "";
            })
            // log in user
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.email = "";
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.email = "";
            })
            //google login
            .addCase(googleLoginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.email = "";
            })
            .addCase(googleLoginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = payload;
            })
            .addCase(googleLoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.email = "";
            })
    }
})

// Action creators are generated for each case reducer function
export const { logout, setUser,toggleLoading } = authSlice.actions

export default authSlice.reducer