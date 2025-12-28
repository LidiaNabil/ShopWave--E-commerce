import React from 'react'

export default function Rating({ rating }: { rating: number }) {
    const noFullStar = Math.floor(rating)
    const noHalfStar = rating-noFullStar >= 0.5 ? 1:0
    const noEmptyStar = 5-(noFullStar+noHalfStar)

return (
    <div className='flex gap-1'>
        {
            Array(noFullStar).fill(0).map((_,index) =>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" key={index} className="size-5 text-yellow-300">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
            </svg>
            )
        }
        {
        noHalfStar ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 20" fill="currentColor" className="size-5 text-yellow-300 -ms-2 me-1">
            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
            </svg> :null
        }
        {
            Array(noEmptyStar).fill(0).map((_,index) =>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" key={index} className="size-5 text-gray-300">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
            </svg>
            )
        }
    </div>
  );
}

