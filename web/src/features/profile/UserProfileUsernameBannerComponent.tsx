import { useRef, useState, useEffect } from 'react'

export const AnimatedUsernamBanner = ({ username }: { username: string }) => {
  const unitRef = useRef<HTMLParagraphElement>(null)
  const [width, setWidth] = useState<number>()

  useEffect(() => {
    if (unitRef?.current) {
      setWidth(unitRef?.current.clientWidth + 16)
    }
  }, [unitRef])

  return (
    <div className="parent relative h-6 w-full overflow-hidden">
      <div className=" absolute top-0 left-0 flex h-full items-center gap-4">
        <p
          ref={unitRef}
          className="first parallelogram_clip pointer-events-none bg-accent px-5"
        >
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
      </div>
      <style>
        {`
          @keyframes scroll {
            0% {
                margin-left: 0px;
            }
            100% {
              margin-left: -${width}px;
            }
          }
          .first {
            animation: scroll 8s linear infinite;
          }
        `}
      </style>
    </div>
  )
}
