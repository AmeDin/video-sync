import React, { Component } from 'react';
import VideoStreamMerger from 'video-stream-merger'
import { connect } from 'react-redux' ;

import { addVideo } from '../actions/videoActions';
import mp4 from '../chikufunny.mp4'
import aac from '../sample.aac'
import { SyncVideo } from '../container/SyncVideo';

class Video extends Component {

    handleVideo = async (id,x,y,multiplier) => {
      var merger = new VideoStreamMerger({
        
      })
  
      var mp4Element = document.createElement('video')
      var aacElement = document.createElement('audio')
  
      mp4Element.muted = true
      mp4Element.autoplay = false
      //mp4Element.play()
      //mp4Element.repeat = true
      mp4Element.src = mp4 
      mp4Element.loop = true // playback after complete
      //mp4Element.msPlayToDisabled = false
  
      Object.defineProperty(mp4Element, 'playing', {
        get: function(){
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        }
      })
  
      if(mp4Element.playing === false)  {
        await mp4Element.play()
      }
  
      aacElement.muted = true
      aacElement.src = aac
  
      aacElement.autoplay = true
  
      const centralVideo = {
        x: merger.width * 1/3,
        y: merger.height * 1/3,
        height: merger.height*1/3,
        width: merger.width*1/3
      }
      // define what size you want your 4 cut-up videos to be and where
      const otherVideos = {
        width: merger.width * 1/3,
        height: merger.height * 1/3,
        x: [0, merger.width - merger.width * 1/3], // x coordinates of both columns
        y: [0, merger.height - merger.height * 1/2] // y coordinates of both rows
      }
  
      //merger.addMediaElement('aac', aacElement)
      merger.addMediaElement('mp4', mp4Element, {
        x: x,
        y: y,
        width: merger.width * multiplier,
        height: merger.height * multiplier,
        mute: false,
        draw: function (ctx, frame, done) { // <- custom draw function
          if (!frame.videoWidth) return done() // <- need to wait for video element to load
      
          // draw the full frame in the center (easy part)
          ctx.drawImage(frame, centralVideo.x, centralVideo.y, centralVideo.width, centralVideo.height)
      
          // draw the cut-up parts in each corner
          otherVideos.x.forEach((colX, i) => { // loop over columns
            otherVideos.y.forEach((rowY, j) => { // loop over rows
              // this defines what part of the frame you're drawing
              const [sx, sy, sWidth, sHeight] = [i*frame.videoWidth/2, j*frame.videoHeight/2, frame.videoWidth/2, frame.videoHeight/2]
      
                // this defines where you're drawing that part
              const [dx, dy, dWidth, dHeight] = [colX, rowY, otherVideos.width, otherVideos.height]
              ctx.drawImage(frame, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            })
          })
          done()
        }
      })
  
      const newVideo = {
        id: id,
        videoStreamMerger: merger,
        mp4: mp4Element,
        currentTime: 0,
        name: "me"
      }
  
      this.props.addVideo(newVideo)
      console.log(this.props)
  
    }
    
      componentDidMount(){
         const { configs } = this.props.config
          for (const config of configs) {
           this.handleVideo(config.id,config.x, config.y, config.sizeMultiplier)
          }
          console.log(this.props)
      }
      
      componentDidUpdate(prevProps){
          const { videos } = this.props.video
          for (const video of videos) {
            var merger = video.videoStreamMerger
            var width = video.videoStreamMerger.width
            var height = video.videoStreamMerger.height

            merger.removeStream("mp4")
            var mp4Element = document.createElement('video')

            mp4Element.muted = true
            mp4Element.autoplay = false
            mp4Element.src = mp4 
            mp4Element.currentTime = video.currentTime
            mp4Element.loop = true // playback after complete

            Object.defineProperty(mp4Element, 'playing', {
                get: function(){
                    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
                }
            })

            if(mp4Element.playing === false)  {
                mp4Element.play()
            }

            const centralVideo = {
                x: merger.width * 1/3,
                y: merger.height * 1/3,
                height: merger.height*1/3,
                width: merger.width*1/3
            }
            // define what size you want your 4 cut-up videos to be and where
            const otherVideos = {
                width: merger.width * 1/3,
                height: merger.height * 1/3,
                x: [0, merger.width - merger.width * 1/3], // x coordinates of both columns
                y: [0, merger.height - merger.height * 1/2] // y coordinates of both rows
            }

            merger.addMediaElement('mp4', mp4Element, {
                x: 0,
                y: 0,
                width: width,
                height: height,
                mute: false,
                draw: function (ctx, frame, done) { // <- custom draw function
                if (!frame.videoWidth) return done() // <- need to wait for video element to load

                // draw the full frame in the center (easy part)
                ctx.drawImage(frame, centralVideo.x, centralVideo.y, centralVideo.width, centralVideo.height)

                // draw the cut-up parts in each corner
                otherVideos.x.forEach((colX, i) => { // loop over columns
                    otherVideos.y.forEach((rowY, j) => { // loop over rows
                    // this defines what part of the frame you're drawing
                    const [sx, sy, sWidth, sHeight] = [i*frame.videoWidth/2, j*frame.videoHeight/2, frame.videoWidth/2, frame.videoHeight/2]

                        // this defines where you're drawing that part
                    const [dx, dy, dWidth, dHeight] = [colX, rowY, otherVideos.width, otherVideos.height]
                    ctx.drawImage(frame, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                    })
                })
                done()
                }
            })
            merger.start()
            var outputElement = document.querySelector("#"+video.id)
                outputElement.srcObject = merger.result
                outputElement.autoplay = true
                outputElement.play()

          }
          console.log(this.props)
      }

  render() {
    const { configs } = this.props.config
    return (
      <div className="video" >
      <SyncVideo />
          <div className="disabled">

              {configs && configs.map(config => {
                  return (
                    <video controls id={config.id} style={{width: '800px'}} key={config.id}></video>
                  )
                })}  
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    config: state.config,
    users: state.users,
    video: state.video
})

const mapDispatchToProps = dispatch => ({
    addVideo: (video) => dispatch(addVideo(video))
})

export default connect(mapStateToProps, mapDispatchToProps)(Video);