import { useEffect, useState } from 'react'
import type { HelloMessage } from '@app/shared'

function App() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/')
      .then((res) => res.json())
      .then((data: HelloMessage) => setMessage(data.message))
  }, [])

  return <h1>{message ?? 'Loading...'}</h1>
}

export default App
