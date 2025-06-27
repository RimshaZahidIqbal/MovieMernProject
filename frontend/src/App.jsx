import { BrowserRouter as Router, Route, Routes } from "react-router"
import { Footer, Navbar } from '../src/components';
import { Home, Explore } from "../src/pages";
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
