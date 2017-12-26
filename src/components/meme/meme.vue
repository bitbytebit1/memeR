<template>
    <v-layout>
      <v-flex xs12 sm8 offset-xs2>
        <v-card>
          <transition name="slide" mode="out-in">
            <!-- Image -->
            <v-card-media>
              <img :src="imgSrc" :key="imgSrc" id="img"> 
            </v-card-media>
          </transition>
          <!-- Title -->
          <v-card-title primary-title>
            <div>
              <div></div>
              <h3 class="headline mb-0">{{title}}</h3>
              <h4 class="headline mb-0">{{description}}</h4>
            </div>
          </v-card-title>
          <!-- Actions -->
          <v-card-actions>
            <v-btn flat color="orange" @click="share">Share</v-btn>
            <v-btn disabled flat color="orange">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>
<script>
export default {
  name: 'meme',
  props: ['imgSrc', 'title', 'description'],
  data () {
    return {
      snackbar: false
    }
  },
  methods: {
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
    styleObj () {
      // Reduce height by 29% to force image to fit screen...
      // Should check image length, if over x then don't bother!
      return { 'height': (window.innerHeight - ((window.innerHeight / 100) * 30)) + 'px' }
    }
  }
}
</script>

<style>
#img{
  height:100%;
}
.slide-fade-enter-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter{
  transform: translateX(100px);
}

.slide-fade-leave-to{
  transform: translateY(-100px);
  opacity: 0;
}

.slide-fade-move {
  transition: transform 2s;
}
</style>
