<template>
  <div class="flame-container">
    <div class="flame-wrapper">
      <div class="flame red"></div>
      <div class="flame orange"></div>
      <div class="flame gold"></div>
      <div class="flame white"></div>
    </div>
  </div>
</template>

<style scoped>
.flame-container {
  position: relative;
  width: 80px;
  height: 90px;
  transform: rotate(225deg);
  transform-origin: 50% 50%;
}
.flame-wrapper {
  width: 80px;
  height: 90px;
  animation: burn 3ms ease-in infinite;
}
.red {
  width: 80px;
  height: 80px;
  background: orangered;
  box-shadow: 0px 0px 10px 5px orangered;
}
.orange {
  left:10px;
  width: 60px;
  height: 60px;
  background: orange;
  box-shadow: 0px 0px 12px 6px orange;
}
.gold {
  left:18px;
  width: 45px;
  height: 45px;
  background: gold;
  box-shadow: 0px 0px 9px 4px gold;
}
.white {
  left:22px;
  width: 35px;
  height: 35px;
  background: lightyellow;
  box-shadow: 0px 0px 9px 4px lightyellow;
}
.flame {
  bottom: 0;
  position: absolute;
  border-radius: 50% 0% 50% 50%;
  transform: rotate(-45deg);
}
@keyframes burn {
  0% {transform: rotate(-1deg);}
  20% {transform: rotate(2deg) scaleY(1.05);}
  40% {transform: rotate(-1deg);}
  60% {transform: rotate(1deg);}
  80% {transform: rotate(-1deg) scaleY(0.9);}
  100% {transform: rotate(1deg);}
}
</style>
