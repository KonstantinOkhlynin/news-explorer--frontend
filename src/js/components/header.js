import {logout} from '../utils/functions'

class Header{
    constructor(popup=null,color=""){
        this._color = color;
        this._popup = popup;
        this.render = this.render.bind(this);
    }
    render(props){
        const {isLoggedIn, userName} = props;
        const header = document.querySelector('.header');
        const logoutIcons = header.querySelectorAll('.header__logout-icon');

        const menu = document.querySelector('.mobile-menu');
        const navIcon = document.querySelector('.header__nav-icon');
        console.log(',');

        navIcon.addEventListener('click',()=>{
            menu.style.display='block';
        })
        document.querySelector('.mobile-menu__close').addEventListener('click',()=>{
            menu.style.display = 'none'
        })


        if (this._color){
            header.classList.add(this._color);
        }
        if (isLoggedIn){
            document.querySelectorAll('.header__auth-name').forEach((item)=>{
                item.innerHTML = userName;
            })
            logoutIcons.forEach((item)=>{
                item.style.display = "inline"
                item.addEventListener('click',()=>{logout(this)});
            });
             document.querySelector('.header__item_main:nth-child(2)').style.display = 'block'
        }
        else{
            header.querySelectorAll('.header__auth-name').forEach((item)=>{
                item.innerHTML = 'Авторизоваться';
            })
            logoutIcons.forEach((item)=>{
                item.style.display = "none"
            });
             document.querySelector('.header__item_main:nth-child(2)').style.display = 'none'

            if (this._popup){
                document.querySelectorAll('.header__auth').forEach((item)=>{
                    item.addEventListener('click',this._popup.open);
                })
            }
        }
    }
}
export default Header;