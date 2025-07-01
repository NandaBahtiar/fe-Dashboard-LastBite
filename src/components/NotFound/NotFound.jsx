import React from 'react';
import {Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";
 import Particles from "../Library/Particles/Particles.jsx";
import SplitText from "../Library/SplitText/SplitText.jsx";

const NotFound = () => {
    return (
        // Gunakan div relatif untuk menjadi container bagi elemen absolut di dalamnya
        <div className="relative flex justify-center items-center w-full h-screen bg-white overflow-hidden">

            {/* Komponen Partikel sebagai latar belakang */}
            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={['#000', '#000']}
                    particleCount={500}
                    particleSpread={30}
                    speed={0.2}

                    particleBaseSize={250}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={false}
                />
            </div>

            {/* Konten teks di atas partikel */}
            <div className="relative z-10 flex  flex-col justify-center items-center">
                <SplitText
                    text="404 Page Not Found!"
                    className="text-7xl h-28 font-extrabold text-center text-gray-800 drop-shadow-lg"
                    delay={200}
                    duration={1.0}
                    ease="back.out(1.7)"
                    splitType="chars"
                    from={{opacity: 0, y: 40, scale: 0.8}}
                    to={{opacity: 1, y: 0, scale: 1}}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                />

                <br/>

                <Link to="/" className="mt-8 px-8 py-4 bg-gray-400 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-3">
                    <FaHome className="text-xl" />
                    <span>Back to Home</span>
                </Link>
            </div>

        </div>
    );
};

export default NotFound;
