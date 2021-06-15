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
    </div>
</template>

<script>
import DisplayMovies from '../components/DisplayMovies.vue';
export default {
    name: 'List',

    components: {
        DisplayMovies

    },
    data(){
        return{
            path : "https://image.tmdb.org/t/p/original",
            maListe:[],
            notList :true
        }
    },
    mounted(){
      this.getList();
    },
    methods:{
        getList(){
            console.log(JSON.parse(localStorage.getItem('maListe')))
            if(localStorage.getItem('maListe')){
                this.notList = false
                this.maListe = JSON.parse(localStorage.getItem('maListe'));
            }else{
                this.notList = true
            }
            
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