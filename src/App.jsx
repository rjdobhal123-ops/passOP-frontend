import Hero from "./Components/Hero"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"


function App() {

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-yellow-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

        {/* Background glow */}
        <div className="pointer-events-none absolute left-0 right-0 top-0  mx-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-30 blur-[100px]" />
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </>
  )
}

export default App
