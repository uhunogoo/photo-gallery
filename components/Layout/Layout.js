// import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../Navigation/Navigation';

// import the component only when it's needed
const Scene = dynamic(() => import("@/components/Webgl/Scene"), {
  ssr: true,
});

function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main className="text-white text-center z-10 relative" style={{pointerEvents: "none"}}>
        {children}
      </main>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex:0
        }}
      >
        <Scene />
      </div>
    </>
  );
}
export default Layout;
