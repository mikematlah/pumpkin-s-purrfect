
 
import { catsData } from "./data.js"

const getBtn = document.getElementById("get-image-btn")
const emotionRadios = document.getElementById('emotion-radios')
const gifsOnlyOption = document.getElementById ('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const closeBtn = document.getElementById ('meme-modal-close-btn')

emotionRadios.addEventListener('change',highlightCheckedOption)

getBtn.addEventListener('click',renderCat)

closeBtn.addEventListener('click',closeModal)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let el of radios){
         el.classList.remove('highlight')
    }
     document.getElementById(e.target.id).parentElement.classList.add('highlight')
 }
 function closeModal(){
    memeModal.style.display = 'none'
 }


 function renderCat(){
    
    const catObject = getSingleCatObject()
   if(document.querySelector('input[type="radio"]:checked')){
        memeModal.style.display = 'flex'
        memeModalInner.innerHTML = `
        <img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt=${catObject.alt}
        >`
         }            
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1){
        return catsArray[0]
    }else{
        let randomIndex = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomIndex]
    }
}
   

function getMatchingCatsArray(){     
   
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
      
}
  

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}


function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for='${emotion}'>${emotion}</label>
            <input
            type='radio'
            value='${emotion}'
            id='${emotion}'
            name='emotions'
            >
           
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)