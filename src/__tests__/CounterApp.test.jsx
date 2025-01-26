import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import CounterApp from "@/feature/CounterApp"

describe("CounterApp Component", () => {
  test("renders items properly", () => {
    render(<CounterApp />)

    // Check that the main elements are rendered
    expect(screen.getByText("Counter App")).toBeInTheDocument()
    expect(screen.getByText("0")).toBeInTheDocument()
    expect(screen.getByText("Even")).toBeInTheDocument()
    expect(screen.getByText("Reset")).toBeInTheDocument()
    expect(screen.getByText("Decrement")).toBeInTheDocument()
    expect(screen.getByText("Increment")).toBeInTheDocument()
  })

  test("displays correct labels based on counter value", () => {
    render(<CounterApp />)

    const counterValue = screen.getByText("0")
    const evenOddLabel = screen.getByText("Even")

    // Initially, the counter is 0 (Even)
    expect(counterValue).toHaveTextContent("0")
    expect(evenOddLabel).toHaveTextContent("Even")

    // Increment the counter
    fireEvent.click(screen.getByText("Increment"))
    expect(counterValue).toHaveTextContent("1")
    expect(screen.getByText("Odd")).toBeInTheDocument()

    // Decrement the counter
    fireEvent.click(screen.getByText("Decrement"))
    expect(counterValue).toHaveTextContent("0")
    expect(screen.getByText("Even")).toBeInTheDocument()
  })

  test("handles function behavior correctly", () => {
    render(<CounterApp />)

    const counterValue = screen.getByText("0")

    // Simulate incrementing the counter
    fireEvent.click(screen.getByText("Increment"))
    expect(counterValue).toHaveTextContent("1")

    // Simulate decrementing the counter
    fireEvent.click(screen.getByText("Decrement"))
    expect(counterValue).toHaveTextContent("0")

    // Simulate resetting the counter
    fireEvent.click(screen.getByText("Reset"))
    expect(counterValue).toHaveTextContent("0")
    expect(screen.getByText("Even")).toBeInTheDocument()
  })
})
