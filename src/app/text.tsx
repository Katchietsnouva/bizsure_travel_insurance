import React from 'react'
import { PRIMARY_RED } from './page'

const text = () => {
    return (
        <div className="  bg-white p-8 rounded-3xl shadow-2xl">
            <div>
                <div>
                    <img
                        src="/qr_code.png"
                        alt="QR code to share this travel insurance form"
                        className="w-48 h-48 mx-auto rounded-lg"
                    />
                </div> 
                <div>
                    <h1 className="text-4xl md:text-6xl font-extrabold">
                        Get Your <span style={{ color: PRIMARY_RED }}>Travel Insurance</span> Today
                    </h1>
                    <p className="text-xl text-gray-600 mt-4">Safe travels start here. Customize your plan in minutes.</p>
                </div>
            </div> 
        </div>
    )
}

export default text
