// NAV

const navBtn = document.querySelector('.header__nav')
window.addEventListener('scroll',function(){
    if(this.window.scrollY >= 80){
        navBtn.classList.add('filled')
    }else{
        navBtn.classList.remove('filled')
    }
})


// STYLE
const thumbnail = document.querySelector('.thumbnail')
thumbnail.style.height = window.innerHeight + 'px'

// VALIDATION


const Validator = (options)=>{

    const ruleSelector = {}

    const validate = (inputElement,rule)=>{
        const errorElement = document.querySelector(options.errorSelector)
        let errorMessage

        const rules = ruleSelector[rule.selector]
        for(let i = 0; i< rules.length; i++){
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText = errorMessage
        }else{
            errorElement.innerText =''
        }
        return !errorMessage
    }

    const formElement = document.querySelector(options.form)
    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault()

            let formIsValid = true

            options.rules.forEach(rule=>{
                const inputElement= formElement.querySelector(rule.selector)
                const formValid = validate(inputElement,rule)

                if(!formValid){
                    return formIsValid = false
                }
            })

            
            if(formIsValid){
                const input = formElement.querySelector(options.input)
                if(typeof options.submit === 'function'){
                    let data = {}
                    data['email__user'] = input.value
                    options.submit(data)
                }
            }

    
        }

        options.rules.forEach(rule=>{
            const inputElement= formElement.querySelector(rule.selector)
            const errorElement = document.querySelector(options.errorSelector)

            if(Array.isArray(ruleSelector[rule.selector])){
                ruleSelector[rule.selector].push(rule.func)
            }else{
                ruleSelector[rule.selector] = [rule.func]
            }

            if(inputElement){
                inputElement.onblur =function(){
                    validate(inputElement,rule)
                }
                inputElement.oninput =function(){
                    errorElement.innerText=''
                }
            }
        })
    }
}

Validator.isRequired = (selector)=>{
    return{
        selector,
        func:(value)=>{
            return value ?  undefined : 'Please at lease tell us your email address'
        }
    }
}

Validator.isEmail = (selector)=>{
    return{
        selector,
        func:(value)=>{
            const regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'This form must be contained a valid email'
        }
    }
}


// MORE BTN PROBLEMS

const problemButton = document.querySelector('.problems__more')
const problems = document.querySelector('.problems')

problemButton.onclick =function(){
    if(problems.classList.contains('open')){
        problems.classList.remove('open')
    }else{
        problems.classList.add('open')
    }
}

// Close btn subcribe

const subBtn = document.querySelector('.subcribe__close')
const subcribe = document.querySelector('.subcribe')

subBtn.onclick=function(){
    if(subcribe.classList.contains('close')){
        subcribe.classList.remove('close')
    }else{
        subcribe.classList.add('close')
    }
}