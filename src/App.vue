<template>
<div>
  <header>
    <div class="header-bar">
      <p class="title">The Moviez Review</p>
      <div class="btn-container">
        <button class="btn-1"> <router-link to='/'>Accueil </router-link>  </button>
        <button class="btn-1"> <router-link to='/list'>Ma Liste</router-link>  </button>
      </div>
    </div>
  </header>
  <div class="search-container">
    <label class="input-search-label" for="search">Rechercher : </label>
    <input id="search" class="search-input">
    <button class="btn-s">Trouver mon film</button>
  </div>
  <router-view></router-view>
  <footer>
    <div class="footer-container">
      <p class="footer-content">The Movies Review - {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
header{
  margin-bottom: 20px;
}
.title{
  
  font-family:fantasy;
  color: #FFF;
  font-size: 46px;
  margin-bottom: 10px;
}
.header-bar{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180px;
  background-image: linear-gradient(to top, #0B488C 0%, #07305D 100%);
  -moz-box-shadow:    3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow:         3px 3px 5px 6px #ccc;
}
.btn-1{
  margin-right: 20px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e4872c;
  color: white;
  width: 100px;
  height: 35px;
  border-radius: 5px ;
}
.btn-s{
    margin-right: 20px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e4872c;
  color: white;
  width: 150px;
  height: 30px;
  border-radius: 15px ;
  margin-left: 10px;
}
.btn-s:hover{
  background-color: white;
  border: 2px solid #e4872c;
  color: #e4872c;
}
.btn-1:hover{
  border-radius: 5px;
  border: 2px solid #e4872c;
  background-color: #0B488C;
  color:#e4872c;
}

a{
  color: white;
  text-decoration: none;
}

.footer-container{
  display: flex;
  justify-content: center;
  height: 50px;
  background-image:  linear-gradient(to top, #0B488C 0%, #07305D 100%);
  -moz-box-shadow:    3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow:         3px 3px 5px 6px #ccc;
}
.footer-content{
  font-family: fantasy;
  font-size: 22px;
  font-weight: bold;
  margin-top:10px ;
  color:white;
}
.search-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
}
.search-input{
  border: 2px solid rgb(226, 226, 226);
  border-radius: 5px;
  height: 30px;
  width: 180px;
}
.input-search-label{
  margin-right: 10px;
  margin-top: 5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #e4872c;
  font-weight: bold;
}
.search-input:focus{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  outline: none !important;
  border: 2px solid #e4872c;
  border-radius: 5px;
  height: 30px;
  width: 180px;
}
</style>