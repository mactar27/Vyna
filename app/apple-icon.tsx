import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          color: 'black',
          border: '8px solid black',
          fontFamily: 'serif',
          fontSize: 120,
          fontWeight: 'bold',
          paddingBottom: 10,
        }}
      >
        V
      </div>
    ),
    { ...size }
  )
}
