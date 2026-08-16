import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const size = { width: 32, height: 32 }
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
          border: '2px solid black',
          fontFamily: 'serif',
          fontSize: 22,
          fontWeight: 'bold',
          paddingBottom: 2, // Slight visual centering adjustment
        }}
      >
        V
      </div>
    ),
    { ...size }
  )
}
