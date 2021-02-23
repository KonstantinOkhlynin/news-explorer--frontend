import NewsCard from './newsCard';
import { NEWS_PER_PAGE } from '../constants/constants';
import {markingArticle } from '../utils/functions'
class NewsCardList{
    constructor(articles){
        this._articles =articles;
        this._articlesList = document.querySelector('.articles__list');
        this._articlesContainer = document.querySelector('.articles__container');
        this._startNumber = 0;
        this.renderResults = this.renderResults.bind(this);
        this.toggleMoreBtn = this.toggleMoreBtn.bind(this)
        this.more = this.more.bind(this);
        this._query= '*'
    }

    renderLoader(){
      this._articlesList.innerHTML=(
            `
            <div></div>
            <div class="articles__loading">
                <div class="articles__loading-preloader"></div>
                <p class="articles__loading-title">Идет поиск новостей...</p>
            </div>
            `
        )
    }


    renderResults(){
        const {_articles, _articlesList, _startNumber} = this;
        if (_articles.length !==0 ){
            if (_startNumber===0){
                _articlesList.innerHTML=''
            }
            if (window.location.toString().indexOf('about')>0){
                _articles.forEach((item,i)=>{
                    //if (item.owner === localStorage.token){
                        const card = new NewsCard({..._articles[i],number:i});
                        _articlesList.innerHTML += card.create()
                    //}
                })
            }
            else{
                for (let i = _startNumber; i<_articles.length && i<_startNumber+NEWS_PER_PAGE ; ++i){

                    const card = new NewsCard({..._articles[i],number:i});
                    _articlesList.innerHTML += card.create()
                }
            }

            this._startNumber = _startNumber + NEWS_PER_PAGE;
        }
        else{
            _articlesList.innerHTML=(
                `
                <div></div>
              <div class="articles__not-found">
                <img src="https://ic.wampi.ru/2021/02/23/not-found-v1.png" alt="" class="articles__not-found-image">
                <p class="articles__not-found-title">Ничего не найдено</p>
                <p class="articles__not-found-subtitle">К сожалению по вашему запросу
                  ничего не найдено.</p>
              </div>
            `)
        }
        _articlesList.querySelectorAll('.articles__flag').forEach((item)=>{
            item.addEventListener('click',(e)=>{
                markingArticle(e,{...this._articles[e.target.dataset.id],keyword: this._query})
            })
        })
        return _articlesList;
    }

    more(){
        if (this._startNumber<this._articles.length){
            const results = this.renderResults();
            this.toggleMoreBtn();
            return results;
        }
    }

    toggleMoreBtn(){

        document.querySelector('.articles__button').disabled = !(this._startNumber < this._articles.length);
    }

    setArticles(articles, query=''){
        this._startNumber = 0;
        this._articles = articles;
        this._query = query
    }

}

export default NewsCardList;