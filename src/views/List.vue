<template>
    <div>
        <div class="container-movie">
        <h1 v-if="notList" class="nList">Pas de liste pour le moment </h1>
        <div v-for="movie in maListe" :key="movie.name">
            <display-movies
                :movieImage="path+movie.poster_path"
                :getDetails="getDetails"
                :id="movie.id"
            >
            </display-movies>
            </div>
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
              <button  class="btn-fav" @click="removeToList(oneMovie.id)">- Retirer de ma liste</button>
            </div>
          </div>
        </modal>
    </div>
</template>

<script>
import DisplayMovies from '../components/DisplayMovies.vue';
import axios from 'axios'; 
export default {
    name: 'List',

    components: {
        DisplayMovies

    },
    data(){
        return{
            path : "https://image.tmdb.org/t/p/original",
            maListe:[],
            notList :true,
            oneMovie:null,
            release_date: null,
            pageIndex:null,
        }
    },
    mounted(){
      this.getList();
    },
    methods:{
        getList(){
            // console.log(JSON.parse(localStorage.getItem('maListe')))
            if(localStorage.getItem('maListe')){
                this.notList = false
                this.maListe = JSON.parse(localStorage.getItem('maListe'));
            }else{
                this.notList = true
            }
            
        },
    async getDetails(movieId){
        this.$modal.show('details');
        const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a4064789326294d183507ea07077479f&language=fr`);
        this.oneMovie = movie.data;
        const yearRelease = this.oneMovie.release_date.split('-');
        this.release_date = yearRelease[0];
        
    },
    removeToList(movieId){
            console.log(movieId)
            for(let i = 0; i< this.maListe.length; i++){
                if(this.maListe[i].id === movieId){
                    this.maListe.splice(i, 1)
                }
            }
            localStorage.removeItem('maListe');
            localStorage.setItem('maListe', JSON.stringify( this.maListe) );    
    }
    }
}
</script>

<style>
.nList{
    font-weight: bold;
    font-size: 42px;
    color: #e4872c;
    font-family: fantasy;
    margin-bottom: 1em;
}
</style>