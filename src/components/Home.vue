<template>
  <v-container 
      v-touch="{
        left: () => swipe('left'),
        right: () => swipe('right')
      }"
    >
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <meme :imgSrc="imgSrc" :title="title"></meme>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import meme from '@/components/meme/meme'
export default {
  name: 'home',
  components: {
    'meme': meme
  },
  data () {
    return {
      TotalPages: 0,
      page: 0,
      imgSrc: 'def',
      title: '',
      memes: [],
      current: -1
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
    setMeme(imgSrc, title) {
      this.imgSrc = imgSrc
      this.title = title
    },
    getNextMeme() {
      this.current++
      if (this.current < this.memes.length) {
        this.setMeme(this.memes[this.current].imgSrc, this.memes[this.current].title)
      } else {
        this.getRandomMeme()
      }
    },
    getPreviousMeme() {
      this.current = Math.max(0, this.current - 1)
      this.setMeme(this.memes[this.current].imgSrc, this.memes[this.current].title)
    },
    getRandomMeme () {
      axios({
          // url: `https://api.imgur.com/3/gallery/search/time/all/160?q_any=meme OR funny`,
          url: `https://api.imgur.com/3/gallery/t/meme/viral/week/${this.page}`,
          method: 'get',
          headers: {
            'Authorization': 'Client-ID c6cf3e7ed9d9be7',
          }
      })
      .then(response => {
        console.log(response.data.data)
          // Calculate total number of pages (60 items per page)
          this.TotalPages = Math.floor(response.data.data.total_items / 60)
          this.$store.commit('setTotalMemes', response.data.data.total_items)
          // get random page for next search
          this.page = this.ran(this.TotalPages)
          // choose random photo index
          let index = this.ran(response.data.data.items.length - 1)
          // If is album choose random photo from album
          if (response.data.data.items[index].is_album) {
            let albumIndex = this.ran(response.data.data.items[index].images.length)
            this.setMeme(response.data.data.items[index].images[albumIndex].link, response.data.data.items[index].title)
          } else {
            this.setMeme(response.data.data.items[index].link, response.data.data.items[index].title)
          }
          this.memes.push({title: this.title, imgSrc: this.imgSrc})
      })
      .catch(err => {
          console.log(err)
      });
    },
    ran (max) {
      return Math.floor((Math.random() * max))
    }
  },
  computed: {
    x3 () {
      
    }
  },
  created () {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
      case 37:
        this.getPreviousMeme()
        break;
      case 38:
         // alert('up');
        break;
      case 39:
      this.getNextMeme()
        break;
      case 40:
        // alert('down');
        break;
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
</style>


