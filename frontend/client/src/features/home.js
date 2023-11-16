import { createAsyncThunk } from '@reduxjs/toolkit';

export const home = createAsyncThunk(
	'',
	async ({ name, user_id }, thunkAPI) => {
		const body = JSON.stringify({
			name,
            user_id
		});

		try {
			const res = await fetch(`/chat/`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: body,
			});

			const data = await res.json();

			if (res.status === 201) {
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);