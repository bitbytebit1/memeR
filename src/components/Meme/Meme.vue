<template>
  <div>
    <v-card
      :max-width="maxSize"
    >
      <div v-if="isVideo">
        <video
          :src="imgSrc"
          autoplay
          loop
          controls
          :style="`max-height: ${maxSize}px; max-width: ${maxSize}px`"
        />
      </div>
      <!-- Image -->
      <v-img
        v-else
        class="ma-auto"
        :lazy-src="imgSrc"
        :src="imgSrc"
        :min-height="maxSize"
        :min-width="maxSize"
        :max-width="maxSize"
        :max-height="maxSize"
        contain
        :key="imgSrc"
        id="img"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <ScalingSquares />
          </v-row>
        </template>
      </v-img>
      <!-- Title -->
      <v-card-title primary-title>
        <div>
          <div
            class="title mb-0"
            style="min-height: 60px;"
          >
            {{ title }}
          </div>
          <div class="headline mb-0">
            {{ description }}
          </div>
        </div>
      </v-card-title>
      <!-- Actions -->
      <v-card-actions class="d-table ma-auto">
        <v-btn
          color="orange"
          @click="share"
        >
          Share
        </v-btn>
        <v-btn
          disabled
          color="orange"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      :timeout="2000"
      top
      right
      class="mr-1"
      v-model="snackbar"
      color="green"
    >
      {{ $vuetify.breakpoint.xsOnly ? 'Sharing' : 'Copied to clipboard' }}
      <v-btn
        icon
        @click.native="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import ScalingSquares from '@/components/Spinners/ScalingSquares.vue'

export default {
  components: {
    ScalingSquares
  },
  name: 'Meme',
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      snackbar: false
    }
  },
  methods: {
    showVideoControls () {

    },
    share () {
      // If mobile
      if (this.$vuetify.breakpoint.xsOnly) {
        // If browser supports share API
        if (navigator.share) {
          navigator.share({
            text: this.title,
            url: this.imgSrc
          })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error))
        }
      } else {
        this.copyToClipboard(this.imgSrc)
      }
      this.snackbar = true
    },
    copyToClipboard (sText) {
      var tmp = document.createElement('input')
      document.body.appendChild(tmp)
      tmp.value = sText
      tmp.select()
      document.execCommand('copy')
      tmp.remove()
    }
  },
  computed: {
    maxSize () {
      return this.$vuetify.breakpoint.smAndDown
        ? window.innerWidth - 25 : '500'
    },
    isVideo () {
      return String(this.imgSrc).includes('.mp4')
    },
    styleObj () {
      // Reduce height by 29% to force image to fit screen...
      // Should check image length, if over x then don't bother!
      return { 'max-height': '50vh' }
    }
  }
}
</script>

<style>

</style>
