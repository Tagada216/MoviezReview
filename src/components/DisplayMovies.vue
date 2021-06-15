<template>
    <div >
        <img :src="movieImage" :alt="nameMovie" width="150" height="200"  @click="getDetails(id)">    
    </div>
</template>

<script>
export default {
    name :"DisplayMovies",
    props:["movieImage", "nameMovie", "getDetails", "id"],

    data(){
        return{

        }
    },


}
</script>

<style>

</style>