import React from 'react'
import { useSelector } from 'react-redux'

export function CounterValue() {
    const count = useSelector((state) => {
        return state.counterApp.countNum
    })
    return (
        <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-white'>Counter Value</h1>
            <span className='text-white'>{count}</span>
        </div>
    )
}
