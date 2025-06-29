import React from 'react';
import FuzzyText from "../FuzzyText/FuzzyText.jsx";
import Particles from "../Particles/Particles.jsx";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        // Gunakan div relatif untuk menjadi container bagi elemen absolut di dalamnya
        <div className="relative flex justify-center items-center w-full h-screen bg-white overflow-hidden">

            {/* Komponen Partikel sebagai latar belakang */}
            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={['#000', '#000']}
                    particleCount={300}
                    particleSpread={20}
                    speed={0.1}

                    particleBaseSize={200}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={false}
                />
            </div>

            {/* Konten teks di atas partikel */}
            <div className="relative z-10 flex  flex-col justify-center items-center">
                <FuzzyText
                    color="#000"
                    fontSize={'clamp(2rem, 10vw, 8rem)'}
                    fontWeight={800}
                >
                    404 Not Found
                </FuzzyText>
                <br/>

                <Link to="/">      <h1> {'<- Back to Home'}</h1></Link>
            </div>

        </div>
    );
};

export default NotFound;
