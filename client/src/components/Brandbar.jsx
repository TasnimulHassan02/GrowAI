import React from 'react'

function Brandbar() {

  const brands = [
    {
      name: "Google",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.23 9.21 3.64l6.85-6.85C35.79 2.16 30.28 0 24 0 14.59 0 6.51 5.38 2.7 13.11l7.99 6.19C12.41 13.39 17.74 9.5 24 9.5z"/>
          <path fill="#34A853" d="M46.11 24.55c0-1.57-.14-3.09-.39-4.55H24v9.11h12.39c-.54 2.95-2.12 5.45-4.51 7.14l7.15 5.54c4.19-3.86 7.08-9.54 7.08-17.24z"/>
          <path fill="#4285F4" d="M24 48c6.48 0 11.9-2.12 15.87-5.72l-7.15-5.54c-2.01 1.37-4.64 2.19-7.61 2.19-5.87 0-10.82-3.96-12.59-9.3l-8.03 6.22C8.39 42.62 15.67 48 24 48z"/>
          <path fill="#FBBC05" d="M11.41 29.63A14.45 14.45 0 0 1 10 24c0-1.97.36-3.87 1.01-5.63l-7.99-6.19A23.86 23.86 0 0 0 0 24c0 3.88.92 7.54 2.7 10.81l8.71-6.18z"/>
        </svg>
      ),
    },
    {
      name: "Oracle",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="42" viewBox="0 0 250 50">
          <path fill="#F80000" d="M125 4c-23.4 0-42.4 19-42.4 42.4S101.6 88.8 125 88.8s42.4-19 42.4-42.4S148.4 4 125 4zm0 72.5c-16.6 0-30.1-13.5-30.1-30.1S108.4 16.3 125 16.3s30.1 13.5 30.1 30.1-13.5 30.1-30.1 30.1z"/>
        </svg>
      ),
    },
    {
      name: "Meta",
      svg: (
        <svg height="42" viewBox="0 0 512 512">
          <path fill="#0081FB" d="M420.7 403.1c-16.3 0-31.6-10.7-50.2-35.3l-87.6-116-87.2 115.5c-19.3 24.7-34.6 36-51 36-27.3 0-47.4-27.7-47.4-67.5 0-65.2 36.4-158.7 82.6-210.8C211.4 86.2 242 72 274 72c31.4 0 61.4 14.2 93.5 52.3 46.4 52.2 82.8 145.8 82.8 210.7 0 39.8-19.8 67.1-49.6 67.1zm-146-199.6l95 126.5c10.4 13.8 22.2 23.9 30.4 23.9 10.1 0 16.9-12.7 16.9-33.5 0-52.2-29.4-131.2-68.4-175-25.1-28.5-46.5-39.7-69.6-39.7-23.3 0-45.6 11.9-69.5 38.6-39.6 43.8-69.3 123.5-69.3 176.1 0 21.2 6.7 34.6 16.8 34.6 8.8 0 20.2-10.6 30.8-25.1l96-126.4z"/>
        </svg>
      ),
    },
    {
      name: "Nvidia",
      svg: (
        <svg width="75" height="42" viewBox="0 0 110 80">
          <path fill="#76B900" d="M0 0v80h110V0H0zm55 10c20.7 0 38.2 15.7 41.3 36H96C92.5 32.7 75.6 17 55 17S17.5 32.7 14 46H13.7C16.8 25.7 34.3 10 55 10zm-.1 14c12.6 0 23 9.9 24.5 22.6H79C77 40.1 66.9 31 54.9 31c-12.1 0-22 9.1-24 20h-3.3C29.1 33.9 40 24 54.9 24zm.1 12c7.9 0 14.5 6.2 15.4 14H39.6c.8-7.8 7.4-14 15.4-14z"/>
        </svg>
      ),
    },
    {
      name: "SpaceX",
      svg: (
        <svg width="140" height="42" viewBox="0 0 400 100">
          <path fill="#0B1743" d="M10 72h110l-53-42h-57zM150 72h110l-53-42h-57zM290 72h110l-53-42h-57z"/>
          <path fill="#0B1743" d="M280 28l90-18-70 38z"/>
        </svg>
      ),
    },
    {
      name: "ScaleAI",
      svg: (
        <svg width="130" height="42" viewBox="0 0 200 50">
          <rect width="200" height="50" rx="8" fill="black" />
          <text x="50%" y="50%" fill="white" fontSize="22" fontFamily="Arial" dominantBaseline="middle" textAnchor="middle">
            Scale AI
          </text>
        </svg>
      ),
    },
  ];

    
  return (
    <div>
      <section className="py-12 text-center">
        <h2 className="text-3xl font-semibold mb-10">Trusted by Leading Brands</h2>
        <div className="w-full py-10 flex items-center justify-center gap-14 flex-wrap border-primary border-t border-b">
            {brands.map((b) => (
                <div key={b.name} className="flex items-center justify-center">
                {b.svg}
                </div>
            ))}
        </div>
      </section>
    </div>
  )
}

export default Brandbar
