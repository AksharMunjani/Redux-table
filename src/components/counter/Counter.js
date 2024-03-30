import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../../store/counter/counterSlice'
import { CounterValue } from '../counterValue/CounterValue'

export function Counter() {
    const count = useSelector((state) => {
        return state.counterApp.countNum
    })
    const dispatch = useDispatch()

    const [incrementAmount, setIncrementAmount] = useState('')

    return (
        <section>
            <div className='flex flex-col justify-center items-center mt-10'>
                <div className=''>
                    <span className='flex items-center justify-center text-white'>{count}</span>
                    <div className='flex gap-10 mt-10'>
                        <button
                            className='w-40 h-10 bg-blue-500 rounded-md text-white'
                            aria-label="Increment value"
                            onClick={() => dispatch(increment())}
                        >
                            Increment
                        </button>
                        <button
                            className='w-40 h-10 bg-blue-500 rounded-md text-white'
                            aria-label="Decrement value"
                            onClick={() => dispatch(decrement())}
                        >
                            Decrement
                        </button>
                        <input
                            className='w-10 h-10 rounded-md text-center border-4 outline-none border-blue-500'
                            aria-label="Set increment amount"
                            placeholder='0'
                            value={incrementAmount}
                            onChange={e => e.target.value.length <= 3 ? setIncrementAmount(e.target.value) : null}
                        />
                        <button
                            className='w-48 h-10 bg-blue-500 rounded-md text-white'
                            aria-label="Decrement value"
                            onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
                        >
                            Increment By Amount
                        </button>
                    </div>
                </div>
                <div>
                    <CounterValue />
                </div>
            </div>
        </section>
    )
}