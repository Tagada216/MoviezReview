<template>
  <div>
    <div class="container-movie" ref="containerMovie">
      <div v-for="movie in moviesList" :key="movie.name">
        <display-movies
          :movieImage="path+movie.poster_path"
          :getDetails="getDetails"
          :id="movie.id"
        >
        </display-movies>
      </div>
    </div>
    <div class="change-page">
      
      <p class="pagination">Page <input class="input-page" v-model="pageIndex" @keyup.enter="getPage(pageIndex)"> / 500</p>
    </div>
    <div class="change-page">
      <button class="btn-page" v-if="pageIndex!=1" @click="getPage(pageIndex-1)"> Précédent </button>
      <button class="btn-page" @click="getPage(pageIndex+1)">Suivant</button>
    </div>
    <!-- Modal pour le détails d'un film -->
        <modal name="details" :height="350" class="modal-border">
          <div v-if="oneMovie">
            <div class="detailsContainer">
              <img class="poster-movie" :src="path+oneMovie.poster_path" width="220" height="250" :alt="oneMovie.title"/>
              <div>
                <p class="title-film">{{oneMovie.title}}</p>
                <div>Synopsis : <p class="synopsis"> {{oneMovie.overview}} </p></div>
                <p class="note">Note du public : {{oneMovie.vote_average}}/10</p>
              </div> 
            </div>
            <div class="fav">
              <button  class="btn-fav" @click="addToList(oneMovie)">+ Ajouter à ma liste</button>
            </div>
          </div>
        </modal>
  </div>
</template>

<script>
import Vue from 'vue';
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading);
import DisplayMovies from '../components/DisplayMovies.vue';
import axios from 'axios'; 
export default {
    name: 'Home',

    components: {
        DisplayMovies

    },
    mounted(){
      this.getAllMovies();
      //localStorage.removeItem('maListe');
      console.log("La liste storage: ",JSON.parse(localStorage.getItem('maListe')));
      console.log("La liste variable", this.maliste)
    },
    data(){
      return{
        fullPage: false,
        moviesList:null,
        path : "https://image.tmdb.org/t/p/original",
        oneMovie:null,
        release_date: null,
        pageIndex:null,
        maliste:[],
      }
    },
    methods: {
      async getAllMovies(){
          let loader = this.$loading.show({
            // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: true,
                  onCancel: this.onCancel,
                  color: "#e4872c"
            });
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=a4064789326294d183507ea07077479f&language=fr').then(resp =>{
          this.moviesList = resp.data.results;
          this.pageIndex = resp.data.page;
          loader.hide()
        });
        
        
      },
      hide () {
            this.$modal.hide('details');
        },
      async getDetails(movieId){
        this.$modal.show('details');
        const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a4064789326294d183507ea07077479f&language=fr`);
        this.oneMovie = movie.data;
        // const yearRelease = this.oneMovie.release_date.split('-');
        // this.release_date = yearRelease[0];
        
      },
      async getPage(index){
        this.pageIndex = index;
        const moviesTemp = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a4064789326294d183507ea07077479f&language=fr&page=${index}`);
        this.moviesList = moviesTemp.data.results;
      },
addToList(movie) {
      console.log(this.maliste);
      this.maListe = JSON.parse(localStorage.getItem("maListe"));
      this.maliste.push(movie);
      localStorage.setItem("maListe", JSON.stringify(this.maliste));
    },
    }
  }
</script>
<style>
.container-movie{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.detailsContainer{
  display: flex;
  flex-direction: row;
}
.title-film{
  margin-top: 15px;
  font-size: 22px;
  color: #e4872c;
  margin-bottom: 1em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-left: 15px;
  font-weight: bold;
}
.synopsis{
  font-size: 13px;
  font-style: italic;
  margin-bottom: 10px;
  margin-left:15px;
  margin-right: 15px;
}
.note{
  margin-left:15px;
  color :#0B488C;
  size: 18px;
}
.fav{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.btn-fav{
  margin-top:10px;
  margin-right: 20px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e4872c;
  color: white;
  width: 180px;
  height: 30px;
  border-radius: 15px ;
  margin-left: 10px;
}
.btn-fav:hover{
  background-color: white;
  border: 2px solid #e4872c;
  color: #e4872c;
}
.poster-movie{
  margin-left: 15px ;
  margin-top: 15px;
}
.btn-page{
  margin-bottom: 20px;
  margin-top:10px;
  margin-right: 20px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e4872c;
  color: white;
  width: 180px;
  height: 30px;
  border-radius: 15px ;
  margin-left: 10px;
}
.btn-page:hover{
  background-color: white;
  border: 2px solid #e4872c;
  color: #e4872c;
}
.change-page{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.modal-border{
  background: linear-gradient(120deg, #0B488C 0%, #e4872c 100%);
  padding: 3px;
  padding: 1rem;
  position: relative;
}
.pagination{
    margin-top: 1em;
    font-weight: bold;
    font-size: 22px;
    color: #e4872c;
    font-family: fantasy;
    margin-bottom: 1em;
    
}
.input-page{
      font-weight: bold;
    font-size: 22px;
    color: #e4872c;
    font-family: fantasy;
  width: 40px;
}
</style>