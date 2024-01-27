import { type FeatureListType } from './featureList'

interface Props {
  children?: React.ReactNode
  upcomingFeatures: FeatureListType
}

export const FeatureRequestsDroplist = ({
  children,
  upcomingFeatures,
}: Props): JSX.Element => {

  return (
    <>
      <details className="dropdown">
        <summary className="btn-sm m-1">upcoming</summary>
        <ul className="dropdown-content menu-sm rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
          {upcomingFeatures.map((feature) => {
            return (
              <li key={feature.id}>
                <span>{feature.name}</span>
              </li>
            )
          })}
        </ul>
      </details>
    </>
  )
}
