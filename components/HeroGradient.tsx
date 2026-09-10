export default function HeroGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      <div
        className="absolute -top-1/3 -left-1/4 w-[160%] h-[220%] opacity-90"
        style={{
          background:
            'conic-gradient(from 200deg at 30% 35%, #A960EE, #635BFF, #90E0FF, #FFCB57, #FF333D, #A960EE)',
          filter: 'blur(90px)',
        }}
      />
      <div className="absolute inset-0 bg-navy/50" />
    </div>
  )
}