<template>
  <div class="data-main-container">
    <div class="bold-number-text" ref="numberElement">
      {{ tweened.number.toFixed(0) }}
    </div>
    <div class="name-text">
      {{ artist.name }}
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'

export default {
  props: {
    artist: Object,
  },
  setup(props) {
    const numberElement = ref(null)
    const tweened = reactive({
      number: 0
    })

    onMounted(() => {
      gsap.to(tweened, {
        duration: 10,
        number: props.artist.number || 0,
        onUpdate: updateNumber, 
        ease: "power4.out"
        })
    })

    const updateNumber = () => {
      if (numberElement.value) {
        numberElement.value.textContent = tweened.number.toFixed(0)
      }
    }

    return {
      numberElement,
      tweened
    }
  }
}
</script>

<style>
  .data-main-container {
    margin: 4vh 0px;
    width: 200px;
  }

  .bold-number-text {
    font-size: xx-large;
    font-weight: 700;
    text-align: center;
  }

  .name-text {
    font-size: large;
    text-align: center;
  }
</style>