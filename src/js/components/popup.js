class Popup{

  constructor (popup_block){
      this._popup_block = popup_block;
      //добавляем закрытие по клику на крестики
      this._popup_block.querySelectorAll('.popup__close').forEach((item)=>{
          item.addEventListener('click',()=>{
              this.close()
          })
      })
      //добавляем переключение по клику на "ссылку" Вход/регистрация
      this._popup_block.querySelectorAll('.popup__link').forEach((item)=>{
          item.addEventListener('click',(e)=>{
              this.setContent(e.target.dataset.action);
          })
      })
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
  }

  open(){
      this._popup_block.classList.add('popup_is-opened');
  }

  close(){
      this._popup_block.classList.remove('popup_is-opened');
  }

  setContent(contentId){
      const popupContainers = this._popup_block.querySelectorAll('.popup__content');
      popupContainers.forEach((item)=>{
          if (item.id == contentId){
              item.classList.remove('popup__content_hide');
          }
          else{
              item.classList.add('popup__content_hide');
          }
      })
  }

}
export default Popup