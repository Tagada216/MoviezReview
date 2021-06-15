import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        themes:{
            light:{
                primary: '#e4872c' ,
                secondary: '#0B488C' 
            },
        },
    },
});
