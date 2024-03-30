import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    countNum: 0,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.countNum += 1
        },
        decrement: (state) => {
            state.countNum -= 1
        },
        incrementByAmount: (state, action) => {
            state.countNum += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer