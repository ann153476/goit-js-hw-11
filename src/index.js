import {Notify} from 'notiflix';
//Notiflix.Notify.failure('Oops, there is no country with that name')//////////////////
//Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

import './css/styles.css';
const form = document.querySelector('.search-form');
const input = document.querySelector(".my__input");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector('.load__more');

loadMore.addEventListener('click', createGalery);

const API_KEY = '33084404-d13ec048243a76c408af7526f';

let pageCalck = 0;

let searchQuery = null;

    ///////////////////////////////////////////////////////
    async function createGalery (){
        
       pageCalck++;
        const response = await axios.get('https://pixabay.com/api/', {
                params: {
                    key: "33084404-d13ec048243a76c408af7526f",
                    q: searchQuery,
                    image_type:"photo",
                    orientation:"horizontal",
                    safesearch:true,
                    page:pageCalck,
                    per_page:40,
                }
            });

          
        
        if(response.data.totalHits===0){
        Notify.failure('Oops, there is no Photo');return;
        } else{
          Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
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
        if(pageCalck >= response.data.totalHits/40){
          loadMore.classList.remove('visible');
              }else{
                loadMore.classList.add('visible');////зявиться кнопка
              }
        
        form.reset();////очистка форми
        }
        //////////////////////////////////.......///////

function f (e){
  //console.log(e.currentTarget.elements.searchQuery.value);searchQuery це name input
    ////////////////////
    e.preventDefault();
    gallery.innerHTML = '';
    pageCalck = 0;
    
    if(input.value.trim()===""){
      loadMore.classList.remove('visible');
        form.reset();////очистка форми
        Notify.failure('Oops, write word');
        return;
    }
    
    
     searchQuery = input.value;
      createGalery();

        
  
}


form.addEventListener('submit', f );  //  , pegeCalckClean





