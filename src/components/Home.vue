<template>
  <v-container
    v-touch="{
      left: () => swipe('left'),
      right: () => swipe('right')
    }"
  >
    <v-row>
      <div class="center-div">
        <!-- <v-card
          min-width="500"
          min-height="500"
        > -->
        <ScalingSquares
          v-if="loading"
          class="ma-auto"
        />
        <!-- <v-card-title /> -->
        <!-- </v-card> -->
        <Meme
          v-else
          :img-src="imgSrc"
          :title="title"
          :description="description"
        />
      </div>
    </v-row>
  </v-container>
</template>
<script>
// /* eslint-disable */
import axios from 'axios'
import Meme from '@/components/Meme/Meme.vue'
import ScalingSquares from '@/components/Spinners/ScalingSquares.vue'
export default {
  name: 'Home',
  components: {
    Meme,
    ScalingSquares
  },
  data () {
    return {
      loading: true,
      TotalPages: 0,
      page: this.ran(100),
      imgSrc: '',
      title: '',
      description: '',
      history: [],
      aCurrent: [],
      current: 0,
      current2: 0
    }
  },
  methods: {
    swipe (direction) {
      if (direction === 'left') {
        this.getPreviousMeme()
      } else {
        this.getNextMeme()
      }
    },
    setMeme (imgSrc, title) {
      this.imgSrc = imgSrc
      this.title = title
    },
    getNextMeme () {
      this.current++
      if (this.current < this.history.length) {
        this.setMeme(this.history[this.current].imgSrc, this.history[this.current].title, this.history[this.current].description)
      } else {
        this.getRandomMeme()
      }
    },
    getPreviousMeme () {
      this.current = Math.max(0, this.current - 1)
      this.setMeme(this.history[this.current].imgSrc, this.history[this.current].title, this.history[this.current].description)
    },
    getRandomMeme () {
      if (this.current % this.aCurrent.length === 0 || this.aCurrent.length === 0) {
        axios({
          // url: `https://api.imgur.com/3/gallery/search/time/all/160?q_any=abstract`,
          // url: `https://api.imgur.com/3/gallery/search/time/all/160?q_any=meme OR funny`,
          url: `https://api.imgur.com/3/gallery/t/meme/all/week/${this.page}`,
          // url: `https://api.imgur.com/3/gallery/t/psychedelic/all/week/${this.page}`,
          method: 'get',
          headers: {
            'Authorization': 'Client-ID c6cf3e7ed9d9be7'
          }
        })
          .then(response => {
            this.loading = false
            // Calculate total number of pages (60 items per page)
            this.TotalPages = Math.floor(response.data.data.total_items / 60)
            this.$store.commit('setTotalMemes', response.data.data.total_items)
            // get random page for next search
            this.page = this.ran(this.TotalPages)
            // choose random photo index
            let index = 0
            // If is album choose random photo from album
            if (response.data.data.items[index].is_album) {
              let albumIndex = this.ran(response.data.data.items[index].images.length)
              this.setMeme(response.data.data.items[index].images[albumIndex].link, response.data.data.items[index].title, response.data.data.items[index].description)
            } else {
              this.setMeme(response.data.data.items[index].link, response.data.data.items[index].title, response.data.data.items[index].description)
            }
            this.aCurrent = response.data.data.items
            this.current = 0
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        // alert('next' + this.current)
        // console.log(this.aCurrent[this.current])
        this.setMeme(this.aCurrent[this.current].link, this.aCurrent[this.current].title, this.aCurrent[this.current].description)
        if (this.aCurrent[this.current].is_album) {
          let albumIndex = this.ran(this.aCurrent[this.current].images.length)
          this.setMeme(this.aCurrent[this.current].images[albumIndex].link, this.aCurrent[this.current].title, this.aCurrent[this.current].description)
        } else {
          this.setMeme(this.aCurrent[this.current].link, this.aCurrent[this.current].title, this.aCurrent[this.current].description)
        }
        this.history.push({ title: this.title, imgSrc: this.imgSrc, description: this.description })
      }
    },
    ran (max) {
      return Math.floor((Math.random() * max))
    }
  },
  created () {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37:
          this.getPreviousMeme()
          break
        case 38:
          // alert('up');
          break
        case 39:
          this.getNextMeme()
          break
        case 40:
          // alert('down');
          break
      }
    }
    this.getRandomMeme()
  },
  destroyed () {
    // document.onkeydown = null
  }
}
</script>

<style>
.center-div{
  margin: auto;
}
</style>
