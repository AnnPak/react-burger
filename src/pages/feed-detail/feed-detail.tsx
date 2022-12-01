import { FC } from 'react'
import styles from './feed-detail.module.scss'
import { useParams } from "react-router-dom";

const FeedDetailPage:FC = () => {
  const {feedId} = useParams()
  return(
    <>
      {feedId}
    </>
  )
}

export default FeedDetailPage; 