import {FormDispDate} from '../utils/functions'

class NewsCard{
    constructor(info){
        this._info = info;


    }

    create(){
        const {urlToImage, publishedAt,title,description,url,source,number,id} = this._info
        const dispDate = FormDispDate(publishedAt);
        let flag = 'articles__flag';
        flag += id ? ' articles__flag-trash' :''
        console.dir(flag);

        const card = `
        <div class="articles__item">
            <div  data-id=${number} class='${flag}'></div>
            <img src=${urlToImage} alt="${flag}" class="articles__article-image">
            <div class="articles__article-information">
                <p class="articles__article-date">${dispDate}</p>
                <h2 class="articles__article-title">${title}</h2>
                <p class="articles__article-subtitle">${description}</p>
                <p >
                    <a class="articles__article-source" href=${url} target="_blank">${source.name}</a>
                </p>
            </div>
        </div>
        `;
        return card
    }

}

export default NewsCard;