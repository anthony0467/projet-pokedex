
<template>
  <div class="loading">
            <img src="http://a.top4top.net/p_1990j031.gif" alt="Loading">
        </div>
       
    
</template>

<style scoped>
* {
    cursor: none
}

body {
    overflow: hidden
}
    
.loading {
    background-color: #FFF;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
}

.loading img {
    display: block;
    height: 209px;
    width: 200px;

    position: fixed;
    top: 35%;
}

.mouse {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: #fff782;
    position: absolute;
    animation: mouseAnimation .5s infinite ease-in-out alternate;
    left: 0;
    top: 0
}

@keyframes mouseAnimation {
    
    from {
        width: 25px;
        height: 25px
    }
    
    to {
        width: 15px;
        height: 15px
    }
    
}
</style>