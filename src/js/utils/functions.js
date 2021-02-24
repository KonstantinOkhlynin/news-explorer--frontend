import NewsApi from '../api/newsApi';
import MainApi from '../api/mainApi'
import NewsCardList from '../components/newsCardList';
import {RESULT_COUNT} from '../constants/constants';
const formApiDate = (date)=>{

    const day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();
    const month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
    const year = date.getFullYear();

    return year + '-' + month + '-' + day;
}
const FormDispDate = (rawDate)=>{
    const date = new Date(rawDate);
    const day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();
    const month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
    const year = date.getFullYear();
    return day + '.' + month + '.' + year;
}
const getNews = (query)=>{
    const toDate = new Date();
    const fromDate =  new Date(toDate - 60 * 60 * 24 * 7 * 1000);
    const newsApi = new NewsApi(
        formApiDate(fromDate),
        formApiDate(toDate),
        "publishedAt",
        RESULT_COUNT,
        "ru"
    )
    const articlesContainer = document.querySelector('.articles__list')
    const newsCardList = new NewsCardList([]);
     newsCardList.renderLoader();

    newsApi.getNews(query)

        .then((result)=>{
            newsCardList.setArticles(result.articles,query);
            newsCardList.renderResults();
            document.querySelector('.articles__button').addEventListener('click',newsCardList.more)
            newsCardList.toggleMoreBtn()
        })
        .catch((err)=>{
            articlesContainer.innerHTML = "error"
            console.error(err)
        })

}

const signUp = (data, popup)=>{
    const mainApi = new MainApi();
    mainApi.signup(data)
        .then((res)=>{
            popup.setContent("popup__success");
        })
        .catch((err)=>{
            popup.setContent("popup__error");
        })
}
const signIn = (data,popup,header)=>{
    const mainApi = new MainApi();
    mainApi.signin(data)
        .then((res)=>{
            console.log(res, data);
            localStorage.setItem('token',res.token);
            mainApi.getUserData(res.token)
                .then(res=>{
                    console.log(res.data.name);
                    localStorage.setItem('username',res.data.name)
                    header.render({isLoggedIn: true, userName:res.data.name});
                })

            popup.close();
        })
        .catch((err)=>{
            console.error(err)
            popup.setContent("popup__error");
        })
}
const logout = (header)=>{
    localStorage.removeItem('token'),
    localStorage.removeItem('username')
    header.render({isLoggedIn: false, userName:''});
}
const markingArticle = (e, article)=>{

    const mainApi = new MainApi();
    const token = localStorage.token;
    if ( !e.target.classList.contains('articles__flag-trash')){
        const preparingArticle = {
            keyword: article.keyword,
            title: article.title,
            text: article.description,
            date: article.publishedAt,
            source: article.source.name,
            link: article.url,
            image: article.urlToImage,
        }
        mainApi.createArticle(preparingArticle,token)
            .then((res)=>{
                e.target.classList.toggle('articles__flag-marked');
            })
            .catch((err)=>{
                console.error(err)
            })
    }
    else{

        mainApi.deleteArticle(article.id,token)
            .then((res)=>{
                e.target.classList.toggle('articles__flag-marked');
                e.target.closest('.articles__item').remove()
            })
            .catch((err)=>{
                console.error(err)
            })
    }

}

const getMarkingArticles = ()=>{
    const mainApi = new MainApi();
    const token = localStorage.token;
    const newsCardList = new NewsCardList([]);
    newsCardList.renderLoader();
    document.querySelector('.articles').style.display = 'block';
    mainApi.getArticles(token)
        .then((res)=>{
            document.querySelector('.articles-info__title_count').innerHTML = res.length;
            const keywords = new Set();
            const preparingArticles = res.map((item)=>{
                keywords.add(item.keyword)
                return {
                    title: item.title,
                    description: item.text,
                    publishedAt: item.date,
                    source: {name:item.source},
                    url: item.link,
                    urlToImage: item.image,
                    id: item._id
                }
            });
            const tags = document.querySelector('.articles-info__subtitle_tags')
            const keywordsArray = Array.from(keywords);
            let count = keywordsArray.length;
            tags.innerHTML = [keywordsArray[0],keywordsArray[1]].join(', ')
            const otherKeywordsCount = count - 2;
            document.querySelector('.articles-info__subtitle_tags-count').innerHTML = otherKeywordsCount > 0 ? ` и ${otherKeywordsCount}-м другим` : '';
            newsCardList.setArticles(preparingArticles);
            // newsCardList.renderLoaderNone();
            newsCardList.renderResults();
            console.log(res);
        })
}

export { formApiDate,
         getNews,
         FormDispDate,
         signUp,
         signIn,
         logout,
         markingArticle,
         getMarkingArticles }