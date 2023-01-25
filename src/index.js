import './css/styles.css';
import Notiflix from 'notiflix';
//Notiflix.Notify.failure('Oops, there is no country with that name')
//Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
// Описаний в документації
import SimpleLightbox, { __esModule } from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
const form = document.querySelector('.search-form');
const input = document.querySelector(".my__input");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector('.load__more');

loadMore.addEventListener('click', fin);

const API_KEY = '33084404-d13ec048243a76c408af7526f';

let pageCalck = 0;

    ///////////////////////////////////////////////////////
    async function fin (){
        
       pageCalck++;
        const response = await axios.get('https://pixabay.com/api/', {
                params: {
                    key: "33084404-d13ec048243a76c408af7526f",
                    q:input.value,
                    image_type:"photo",
                    orientation:"horizontal",
                    safesearch:true,
                    page:pageCalck,
                    per_page:40,
                }
            });
        
        if(response.data.totalHits===0){
        Notiflix.Notify.failure('Oops, there is no Photo');return;
        } else {
            Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        }
        
        const markup = response.data.hits.map((galleryItem) =>
        `<div class="photo-card">
        <a class="gallery__item" href="${galleryItem.webformatURL}">
        <img src="${galleryItem.webformatURL}" data-source="${galleryItem.tags}" alt="${galleryItem.tags}" loading="lazy" width="250"/></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${galleryItem.likes}
          </p>
          <p class="info-item">
            <b>Views</b>${galleryItem.views}
          </p>
          <p class="info-item">
            <b>Comments</b>${galleryItem.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${galleryItem.downloads}
          </p>
        </div>
        </div>`).join("");
    
        gallery.insertAdjacentHTML("beforeend", markup);

        let lightbox = new SimpleLightbox('.gallery a',
        {captionsData: "alt",
        captionDelay: 250,
        captionType: "alt",}
        );
        form.reset();////очистка форми
        }
        //////////////////////////////////.......///////

function f (e){
    
    e.preventDefault();
    gallery.innerHTML = '';
    

    if(input.value.length<3||input.value===""||input.value===" "||(typeof input.value)==="number"){
        form.reset();////очистка форми
        Notiflix.Notify.failure('Oops, write word');
        return;
    }else{
        
        loadMore.classList.add('visible');
    
        fin();
    }
    
    

    
     
}


form.addEventListener('submit', f );  //  , pegeCalckClean





