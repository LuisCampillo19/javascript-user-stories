// variable declaretion - request it only once
let name = prompt("What's your name?")

//
while (true){
    let age = parseInt(prompt("How old are you?"))


    // validation logic
    if (age > 0 && age < 13){
        alert(`Hello ${name}, you are in your childhood. Keep learning and enjoying coding!`)
        break; // close the cycle
    }else if (age > 12 && age < 18){
        alert(`Hello ${name}, you are under age. Keep learning and enjoying coding!`)
        break;
    }else if (age > 17 && age < 100){
        alert(`Hello ${name}, you are of legal age. Keep learning and enjoying coding!`)
        break;
    } else{ //repeat the cycle if you make a mistake
        alert(`Hello ${name}, please note that valid ages are 1 to 99 years old!`)
    }
}