import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import auth from "../../firebase/firebase.config"

const initialState = {
    user: {
        email: "",
        role: "",
    },
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

// get user data from database
export const getUser = createAsyncThunk("auth/getUser",
    async (email) => {
        const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`);
        const data = await res.json();
        // if user registered as candidate or employee
        if (data.status) {
            return data;
        }
        return email;
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {email:"",role:""};
        },
        setUser: (state, { payload }) => {
            state.useremail = payload;
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
                state.useremail = payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.useremail = "";
            })
            // log in user
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.useremail = "";
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user.email = payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.user.email = "";
            })
            //google login
            .addCase(googleLoginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.user.email = "";
            })
            .addCase(googleLoginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user.email = payload;
            })
            .addCase(googleLoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.user.email = "";
            })
            // get user
            .addCase(getUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.user.email = "";
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                // if user registered as candidate or employee
                if (payload.status) {
                    state.user = payload.data;
                }
                else {
                    state.user.email = payload;
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.user.email = "";
            })
    }
})

// Action creators are generated for each case reducer function
export const { logout, setUser, toggleLoading } = authSlice.actions

export default authSlice.reducer