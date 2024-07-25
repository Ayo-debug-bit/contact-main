const radioDivs=document.querySelectorAll(".qtype");
const forms=document.querySelectorAll("input-group");
const formElement=document.querySelector("input-row")
const toast=document.querySelectorAll("toast");
let formValid=true;

forms.setAttribute("novalidate","");
const changeRadioBg=()=>{
    radioDivs.forEach(radioDiv=>{
        const radio=radioDiv.querySelector("input");
        if (radio.checked){
            radioDiv.classList.add("radio-selected");
        } else{
            radioDiv.classList.remove("radio-selected");
        }
    });
};

const displayError=(forms,error)=>{
    const errorMessage=forms.querySelector(error);
    errorMessage.classList.remove("hidden");
};

const removeError=(forms)=>{
    const errorMessage=forms.querySelectorAll(".error");
    errorMessage.forEach(error=>{
        error.classList.add("hidden");
    })
};

const validateGroup=forms=>{
    const inputType=forms.querySelector("input,textarea").type ||"text";

    switch (inputType){
        case"radio":
        let checked=false;
        const radioInputs=forms.querySelectorAll("input");

        radioInputs.forEach(input=>{
            if (input.checked){
                checked=true;
            }
        });
        if (!checked) {
            displayError(forms,"error");
            formValid=false;
        }
        break;
        case "checkbox":
            const checkInput=forms.querySelector("input");
            if (textInput.value.trim()==="") {
                displayError(forms,".error");
                formValid=false;
            }               
            break;
            case"textarea":
            const textareaInput=forms.querySelector("textarea");
            
            if (textareaInput.value.trim()===""){
                displayError(forms,".error");
                formValid=false;
            }
            break;
            case"email":
            const emailInput=forms.querySelector("input");
            const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (emailInput.value.trim()===""){  
                formValid=False; 
            } else if (!emailPattern.test(emailInput.value)){
                displayError(forms,"valid");
                formValid=false;
            }
            break;
            default:
            break;
    }
};

const displayToast=()=>{
    setTimeout(()=>{
    toast.classList.remove("hidden");
    },10);
    setTimeout(()=>{
    },4000);
}

document.addEventListener('DOMContentLoaded',()=>{
    if (localStorage.getItem('showToast')==='true'){
        displayToast();

        localStorage.removeItem('showToast');
    }
});

radioDivs.forEach(radioDiv=>{
   radioDiv.addEventListener("click",()=>{
    radioInput.checked=true;
    changeRadioBg();
    removeError(radioDiv.parentElement.parentElement);
   });
});

formElement.addEventListener("submit",event=>{
    event.preventDefault();

    formValid=true;

    forms.forEach(forms=>{
        validateGroup(forms);
    });
    if (formValid){
        localStorage.setItem('showToast','true');
        formElement.submit();
    }
});

forms.forEach(forms=>{
    const inputs=forms.querySelectorAll("input,textarea");
    inputs.forEach(input=>{
        input.addEventListener("click",()=>{
            removeError(forms);
        });

        input.addEventListener("blur",()=>{
            validateGroup(forms);
        });
    });
});

toast.addEventListener("click",()=>{
    toast.classList.add("hidden");
});