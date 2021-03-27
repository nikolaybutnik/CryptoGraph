import './App.css'

function App() {
  const fetchETH = () => {
    fetch('/api/ethprice', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json(res))
      .then((data) => console.log(data.data.result.ethusd))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <h1>HELLO</h1>
      <button onClick={fetchETH}>Fetch Data</button>
    </>
  )
}

export default App
