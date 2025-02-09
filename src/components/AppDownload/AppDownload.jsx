import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience. <br /> Download Our App</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="PlayStore Image" />
        <img src={assets.app_store} alt="App Store Image" />
      </div>
    </div>
  )
}

export default AppDownload