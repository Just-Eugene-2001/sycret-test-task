import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CertificatesState, Certificate } from '../types';


export const loadCertificatesList = createAsyncThunk<any, undefined, { state: RootState }>(
  'certificates/loadCertificatesList',
  async (_, { rejectWithValue }) => {
    const key = process.env.REACT_APP_API_KEY;
    const url = `https://sycret.ru/service/api/api`;
    try {
      const response = await fetch(`${url}?ApiKey=${key}&MethodName=OSGetGoodList&ismob=0`);
      const data = await response.json();
      return data.data;
    } catch (err) {
      return rejectWithValue('Ошибка метода OSGetGoodList');
    }
})

export const postCertificate = createAsyncThunk<any, any, { state: RootState }>(
  'certificates/postCertificate',
  async (postData, { rejectWithValue }) => {
    const key = process.env.REACT_APP_API_KEY;
    const url = `https://sycret.ru/service/api/api`;
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ 
          ...postData,
          MethodName: "OSSale",
          ApiKey: key
        })
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue('Ошибка метода OSSale');
    }
})

const initialState: CertificatesState = {
  certificatesList: [],
  selectedCertificate: null,
  loading: false,
  error: null,
}

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    selectCertificate(state, action: PayloadAction<Certificate>) {
      state.selectedCertificate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCertificatesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCertificatesList.fulfilled, (state, action: PayloadAction<Certificate[]>) => {
        state.loading = false;
        state.certificatesList = action.payload
      })
      .addCase(loadCertificatesList.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(postCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCertificate.fulfilled, (state, action: AnyAction) => {
        state.success = action.payload;
        state.loading = false;
      })
      .addCase(postCertificate.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.loading = false;
      })
  }
});

export const { selectCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer;
