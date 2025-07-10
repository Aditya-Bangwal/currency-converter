const url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");

const updatexchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    const URL = `${url}${fromCurr.value.toLowerCase()}.json`;
    
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        let finalamt = (rate * amtval).toFixed(2);
        
        msg.innerText = `${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Failed to fetch exchange rate.";
    }
};


for(let select of dropdowns)
{
    for(let currcode in countryList)
    {
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode=="USD")
        {
            newoption.selected="selected";
        }
        else if (select.name === "to" && currcode === "INR") {
            newoption.selected = true;
        }
        select.append(newoption);
        }
  
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsource=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsource;

};
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updatexchangerate();
});

document.addEventListener("DOMContentLoaded",()=>{
    updatexchangerate();

});


// const updatexchangerate=async()=>{
//     let amount=document.querySelector(".amount input");
//     let amtval=amount.value;
//     if(amtval ===""  || amtval<1)
//     {
//         amtval=1;
//         amount.value="1";
//     }
//     const URL = `${url}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     let response=await fetch(URL);
//     let data=await response.json();
//     let rate=data[toCurr.value.toLowerCase()];
//     console.log(rate);
//     let finalamt=rate *amtval;
//     msg.innerText=`${amtval} ${fromCurr.value} =${finalamt} ${toCurr.value}`;
// }













