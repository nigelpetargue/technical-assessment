import { useEffect, useState } from "react"

const defaultInputs = {
  firstNumber: 0,
  secondNumber: 0,
}

export default function SimpleCalculator() {
  const [inputs, setInputs] = useState(defaultInputs)
  const [sum, setSum] = useState(0)

  const handleOnChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setInputs(defaultInputs)
    setSum(0)
  }

  useEffect(() => {
    const { firstNumber, secondNumber } = inputs
    const result = Number(firstNumber) + Number(secondNumber)

    setSum(result)
  }, [inputs])

  return (
    <div className='w-1/2 h-1/2 md:w-1/6 flex flex-col items-center'>
      <p className='text-2xl font-bold'>Simple Calculator</p>

      <div className='mt-10 flex items-center justify-center gap-5'>
        <input
          onChange={(e) => handleOnChange("firstNumber", e.target.value)}
          className='border-2 border-neutral-600 rounded-sm text-center py-2'
          value={inputs.firstNumber}
        />
        <span>+</span>
        <input
          onChange={(e) => handleOnChange("secondNumber", e.target.value)}
          className='border-2 border-neutral-600 rounded-sm text-center py-2'
          value={inputs.secondNumber}
        />
      </div>

      <p className='text-7xl font-bold mt-10'>{sum}</p>
      <button onClick={handleReset} className='bg-slate-200 rounded-md py-2 px-3 mt-5'>
        Reset
      </button>
    </div>
  )
}
