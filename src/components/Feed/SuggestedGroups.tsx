import React from 'react'
import SingleGroup from './SingleGroup'
import { useQuery } from '@apollo/client'
import GET_STORES from 'src/graphql/queries/getStores'
import getImageUrl from 'src/utils/getImageUrl'

const SuggesstedGroups = ({ title }) => {
  const { loading, error, data } = useQuery(GET_STORES)

  if (loading) return <p>'Loading...'</p>
  if (error) return <p>`Error! ${error.message}`</p>
  const { stores } = data

  return (
    <div className="bg-white rounded-xl overflow-hidden mb-8 p-8">
      <div className="text-sm text-black font-medium ">{title}</div>
      <div className="mt-2">
        {stores
          .filter((store) => store?.isPopular)
          .map(
            (store, i) =>
              i <= 3 && (
                <SingleGroup
                  img={store?.profileImage ? getImageUrl(store?.profileImage?.url) : '/assets/img/feed/group-01.jpg'}
                  name={store?.businessInformation?.name}
                  followers={store?.followers?.length}
                  id={store?.id}
                />
              ),
          )}
        {/* <SingleGroup img="/assets/img/feed/group-01.jpg" name="Geometrik design" followers="5" />

        <SingleGroup img="/assets/img/feed/group-02.jpg" name="Yellow Leaf Hammocks" followers="2" />

        <SingleGroup img="/assets/img/feed/group-03.jpg" name="Geometrik design" followers="5" />

        <SingleGroup img="/assets/img/feed/group-04.jpg" name="Yellow Leaf Hammocks" followers="2" /> */}
      </div>
    </div>
  )
}

export default SuggesstedGroups
