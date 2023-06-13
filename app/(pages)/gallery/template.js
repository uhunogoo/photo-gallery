'use client'
const { Suspense } = require("react");

function Template({children}) {
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}

export default Template