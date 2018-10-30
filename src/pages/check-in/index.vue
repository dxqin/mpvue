<template>
  <div class="container-middle">
    <staytuned> </staytuned>
  </div>
</template>
<script>
import './wxss/index.wxss';
import staytuned from "./../../components/stay-tuned/index";
import { parse } from 'semver';
export default {
  data() {
    return { 
    }
  },
  onLoad() {},
  methods: {
     
  },
  components : {
    staytuned
  }
 }
</script>