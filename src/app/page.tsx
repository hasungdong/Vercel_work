'use client';

import { useState } from 'react';

export default function Home() {
 const [count, setCount] = useState(0);

 return (
   <main className="flex min-h-screen flex-col items-center justify-center gap-4">
     <h1 className="text-3xl font-bold">카운터: {count}</h1>
     <button 
       onClick={() => setCount(count + 1)}
       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
     >
       숫자 증가
     </button>
   </main>
 );
}