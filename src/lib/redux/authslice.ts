import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Assuming JwtHeader is the correct type from 'jwt-decode'

// Define a type for the decoded data
interface DecodedData {
  exp: number;
}


const initialState: { user: DecodedData | null } = {
  user: null,
};

const jwtToken = localStorage.getItem('jwtToken');

if (jwtToken) {
  const decodeData = jwtDecode<DecodedData>(jwtToken);
  const exp = decodeData.exp * 1000 < Date.now();

  if (exp) {
    localStorage.removeItem('jwtToken');
    initialState.user = null;
  } else {
    initialState.user = decodeData;
  }
}

export const authSlice = createSlice({
  name: 'authuser',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('jwtToken', action.payload.token);
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('jwtToken');
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
