<template>
  <video-player
    id="CustomVideoPlayer"
    class="video-player"
    crossorigin="anonymous"
    controls
    :sources="videoSource.sources"
    :height="320"
    :volume="0.4"
    :control-bar="{
      // custom Video.js control bar component
      // https://videojs.com/guides/options/#componentname
      volumePanel: true,
    }"
  />
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
export default defineComponent({
  name: "vue-custom-player-example",
  title: "Custom player (Vue)",
  props: ["media"],
  url: import.meta.url,
  components: {
    VideoPlayer,
  },
  setup(props) {
    const videoSource = {
      poster: "",
      sources: [
        {
          src: props.media,
          type: "video/mp4",
        },
        {
          src: "",
          type: "video/ogg",
        },
      ],
    };

    return { videoSource };
  },
});
</script>

<style scoped>

@media screen and (max-width: 768px) {
    /* .video-js {
        position: absolute !important;
        width: 100% !important;
        display: flex;
        flex-basis: 100% !important;

    }

    .video-js:deep() .vjs-tech {
        position: absolute !important;
        width: 100% !important;
   
    } */
}
.video-js {
    position: relative !important;

    background: #343439 !important;
    /* border-top: .2px solid var(--dashBorder) !important;
    border-bottom: .2px solid var(--dashBorder) !important; */
}

.video-js:deep() .vjs-tech {
    position: relative !important;
}
.video-player:deep() .vjs-big-play-button {
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  background: #38bdf8;
  transform: translate(-50%, -50%);
}

.video-player:deep() button[title="Play"] > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/switchOn.png) !important;
  margin-left: 5px;
  margin-top: 3px;
}

.video-player:deep() button[title="Pause"] > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/switchOff.png) !important;
  margin-left: 5px;
  margin-top: 3px;
}
.video-player:deep() button[title="Unmute"] > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/muted.png) !important;
  margin-left: 5px;
  margin-top: 3px;
}

.video-player:deep() button[title="Mute"] > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/unmuted.png) !important;
  margin-left: 5px;
  margin-top: 3px;
}

.video-player
 :deep() button[title="Picture-in-Picture"]
  > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/pip.svg) !important;
  margin-left: 5px;
  margin-top: 3px;
}
.video-player
 :deep() button[title="Exit Picture-in-Picture"]
  > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/pip.svg) !important;
  margin-left: 5px;
  margin-top: 3px;
}

.video-player
 :deep() button[title="Picture-in-Picture"]
  > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/pip.svg) !important;
  margin-left: 5px;
  margin-top: 3px;
}

.video-player:deep() button[title="Fullscreen"] > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/fullscreen.png) !important;
  margin-top: 3px;
}

.video-player
 :deep() button[title="Exit Fullscreen"]
  > .vjs-icon-placeholder::before {
  content: url(@/assets/svg/fullscreen.png) !important;
  margin-top: 3px;
}

.video-player:deep() .vjs-control-bar {
  background-color: #06b6d4 !important;
}
.video-player:deep() button[title="Play"] {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vjs-big-play-button:hover {
  background-color: transparent;
  opacity: 0.7;
}

.video-player {
  background-color: black;
  width: 100%;
}
</style>
