import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { HomeIcon } from 'src/features/Icons/icons'
import ResponsiveLayout from 'src/layouts/ResponsiveLayout/ResponsiveLayout'

const Constants = {
  header: '🙅 ?!?!! 🙅',
  message1: 'Chasing after the unattainable is the fun part. - Dean Potter',
  message2: "Not here though, this page doesn't exist!",
}

export default () => (
  <>
    <ResponsiveLayout>
      <MetaTags title="Not Found" description="404 error page" />
      <div className="flex w-full flex-col items-center gap-8">
        <div className="hero rounded bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">{Constants.header}</h1>
              <p className="py-6">{Constants.message1}</p>
              <p className="py-6">{Constants.message2}</p>
              <button
                onClick={() => navigate(routes.home())}
                className="btn btn-primary gap-2"
              >
                Home
                <HomeIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  </>
)
