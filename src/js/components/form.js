class Form{

  //Класс работы с формой, выбранной по селектору
  constructor(formSelector){
      this._form = document.querySelector(formSelector);
      this._inputs = this._form.querySelectorAll('input');
      this._submitBtn = this._form.querySelector('button');
      this._validateForm = this._validateForm.bind(this);
      this._validateInputElement = this._validateInputElement.bind(this);
      this._clear = this._clear.bind(this);
      this._getInfo = this._getInfo.bind(this);
  }

  _validateInputElement(input){
      const text = input.value;
      if (input.classList.contains('search__input')){
          return true;
      }
      switch (input.type){
          case "email":{
              let re = /\S+@\S+\.\S+/;
              return re.test(text);
          }
          case "password":{
              return (text.length >= 8)

          }
          case "text":{
              return (text.length>=2 && text.length<=30)
          }
          default:{
              return true
          }
      }
  }
  _validateForm(){
      let isFormValid = true;
      this._inputs.forEach((input)=>{
          isFormValid = isFormValid && this._validateInputElement(input);
      });
      this._submitBtn.disabled = !isFormValid;
      if (isFormValid) {
        this._submitBtn.classList.add('form__button_activ');
      } else {
        this._submitBtn.classList.remove('form__button_activ');
     }

  }
  _clear(){
      this._inputs.forEach((input)=>{
          input.value='';
      });
  }
  _getInfo(){
      const info = {};
      this._inputs.forEach((input)=>{
          info[input.dataset.propname] = input.value;
      });
      return info;
  }

  setEventListeners(submitEvent){
      this._inputs.forEach((input)=>{
          input.addEventListener('input', this._validateForm)
      });
      this._form.addEventListener('submit',(e)=>{
          e.preventDefault();
          submitEvent(this._getInfo());
      })
  }
  removeEventListeners () {
      this._inputs.forEach((input)=>{
          input.removeEventListener('input', this._validateForm);
      });
  };

}

export default Form;