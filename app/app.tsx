// import React from 'react';
// import ReactDOM from 'react-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Home from './page'; // Ajusta la ruta según tu estructura de archivos
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { createRoot } from 'react-dom/client';

// const queryClient = new QueryClient();
// const container = document.getElementById('root');

// if (container){
//     const root = createRoot(container);
//     root.render(
//         <React.StrictMode>
//           <QueryClientProvider client={queryClient}>
//             <Home />
//             <ReactQueryDevtools initialIsOpen={false} />
//           </QueryClientProvider>
//         </React.StrictMode>,
//       );
// }else {
//     console.error('No se encontró el elemento con id "root"')
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <Home />
//     </QueryClientProvider>
//     <ReactQueryDevtools initialIsOpen={false} />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


//     <React.StrictMode>
//         <QueryClientProvider client={queryClient}>
//             <Home />
//             <ReactQueryDevtools initialIsOpen={false} />
//         </QueryClientProvider>
//     </React.StrictMode>,
//   document.getElementById('root')
