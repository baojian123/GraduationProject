<template lang="html">
  <div class="">
    <div class="ball-set">
  			<div class="temp"></div>
  			<div class="fly" v-bind:class="{ 'fly-show': is_show }" >
  				<div class="ball">
  					<svg class="center" style="width:36px;height:36px" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z" />
  					</svg>
  				</div>
  			</div>
  			<div class="fly" v-bind:class="{ 'fly-show': is_show }" >
  				<div class="ball">
  					<svg class="center"style="width:36px;height:36px" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M21,14H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10L8,21V22H16V21L14,18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
  					</svg>
  				</div>
  			</div>
  			<div class="fly" v-bind:class="{ 'fly-show': is_show }">
  				<div class="ball">
  					<svg class="center" style="width:30px;height:30px" viewBox="-1 -1 23 23">
              <path fill="#ffffff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
  					</svg>
  				</div>
  			</div>
  			<div class="fly" v-bind:class="{ 'fly-show': is_show }" @click="is_show=!is_show">
  				<div class="ball" >
  					<svg class="center"style="width:36px;height:36px" viewBox="0 0 24 24">
			        <path fill="#ffffff" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  					</svg>
  				</div>
  			</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'ButtonSet',
  data () {
    return {
      is_show: false
    }
  }
}
</script>

<style scoped>
  .center{
  	position: absolute;
  	top:14.5%;
  	left:14.5%;
  }
  .fly{
  	cursor: pointer;
  	z-index: 20;
  	position: fixed;
  	bottom:40px;
  	right: 40px;
  	height:50px;
  	width: 50px;
  	-webkit-transition: all 1.5s;
  	-moz-transition: all 1.5s;
  	-ms-transition: all 1.5s;
  	-o-transition: all 1.5s;
  	transition: all 1.5s;
  }

  .fly:nth-of-type(5)>.ball{
  	opacity: 1;
  	background-color: #9932CC;
  	box-shadow: 5px 5px  7px 0 rgba(0,0,0,.3);
  }
  .fly:nth-of-type(4)>.ball{
  	background-color: #FF4500;
  }
  .fly:nth-of-type(3)>.ball{

  	background-color: #32CD32;

  }
  .fly:nth-of-type(2)>.ball{
  	background-color: #8470FF;
  }

  .fly-show:nth-of-type(5){
  	bottom:40px;

  	opacity: 1;
  	-webkit-transform: rotate(135deg);
  	-moz-transform: rotate(135deg);
  	-ms-transform: rotate(135deg);
  	-o-transform: rotate(135deg);
  	transform: rotate(135deg);
  }
  .fly-show:nth-of-type(4){
  	bottom:110px;

  	opacity: 1;
  }
  .fly-show:nth-of-type(3){
  	bottom:180px;

  	opacity: 1;
  }
  .fly-show:nth-of-type(2){
  	bottom:250px;

  	opacity: 1;
  }

  .ball{
  	transform:scale(1, 1);
  	height: 50px;
  	width: 50px;
  	border-radius: 50%;
  	opacity: 0;
  	-webkit-transition: all 0.5s ease-out;
  	-moz-transition: all 0.5s ease-out;
  	-ms-transition: all 0.5s ease-out;
  	-o-transition: all 0.5s ease-out;
  	transition: all 0.5s ease-out;
  	text-align:center
  }

  .ball-hidden{
  	transform:scale(0, 0);
  }

  .fly-show .ball{
  	opacity: 1;
  }
  .fly-show:nth-of-type(5)>.ball{
  	opacity: 1;
  	background-color: #9932CC;
  	box-shadow: 0px -5px  7px 0 rgba(0,0,0,.3);
  }
</style>
