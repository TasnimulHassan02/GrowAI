import React from 'react'

function Hero() {

  return (
    <div>

    <section className="grid md:grid-cols-2 gap-6 px-10 py-24">
        <div className='mt-5'>
          <h1 className="text-5xl font-medium leading-snug mb-7">
            Transform Your Visions into Realities with Smart Data.
          </h1>
          <p className="text-gray-600 mb-7">
           GrowAI helps you make smarter decisions with clear, actionable insights powered by data and AI. We turn data, AI and advanced analytics into powerful tools that help businesses grow, innovate and stay ahead. Simple, intelligent and built for real impact.
          </p>
          <div className="flex gap-4">
            <button className="btn bg-black text-white px-6 rounded-3xl">Let's Talk</button>
            <button className="btn btn-outline btn-primary text-black px-6 rounded-2xl">Discover More</button>
          </div>
        </div>
        <div className="flex justify-center">
          <img src="./src/asset/hero-illustration.png" alt="illustration" className="w-3/4" />
        </div>
    </section>

      
    </div>
  )
}

export default Hero
