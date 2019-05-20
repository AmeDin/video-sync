import { connect } from 'react-redux'
import SyncVideoComponent from '../components/SyncVideo'
import { syncVideo } from '../actions/wsActions'

const mapDispatchToProps = dispatch => ({
  dispatch: (message, author, currentTime) => {
    dispatch(syncVideo(message, author, currentTime))
  }
})

export const SyncVideo = connect(() => ({}), mapDispatchToProps)(SyncVideoComponent)