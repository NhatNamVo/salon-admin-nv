import { createApp } from 'vue';

import App from './App.vue';
import router from './routes/routes';
import './templates/template.scss';

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import 'cropperjs/dist/cropper.css';
import VueUploadComponent from 'vue-upload-component';

const app = createApp(App);

app.use(router);
app.use(ElementPlus)
app.component('file-upload', VueUploadComponent)

app.mount('#app')
