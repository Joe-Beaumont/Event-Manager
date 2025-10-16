import { Header } from "./components/Header"
import { Nav } from "./components/Nav"
import { Content } from "./components/Content"
import "./App.css"
import Login from "./components/Login"


export default function App() {
  return (
    <div className="app-container">
      <header className="top-banner">
        <div className="topbar">
          <Login />
          <Nav />
          <Header />
        </div>
      </header>

      <main className="content">
        <Content />
      </main>
    </div>
  )
}