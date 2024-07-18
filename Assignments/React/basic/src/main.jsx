import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

function Header(){
  return <div>
    <h1>this is Header</h1>
  </div>
}

function MainContent(){
  return <div>
    <p>this is main content of the webpage.</p>
  </div>
}

function Footer(){
  return <div>
    <p>This is Footer</p>
  </div>
}

function Layout(){
  return <div>
    <Header />
    <MainContent />
    <Footer />
  </div>
}


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,

<Layout />

)
