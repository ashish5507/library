const mylib = [];
const main = document.querySelector("main");
function Book(bookName, bookAuthor, read, pages){
    this.id = Date.now();
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.read = read;
    this.pages = pages;
}

function addBookToLibrary(name,author,read, pages){
    const book = new Book(name,author,read, pages);
    mylib.push(book);
    return book;
}

const formdiv = document.querySelector(".form");
const addbookbtn = document.querySelector("#addbook");
const cancelbtn = document.querySelector(".cancel");
cancelbtn.addEventListener("click",()=>{
    formdiv.style.display="none";
})
addbookbtn.addEventListener("click",()=>{
    formdiv.style.display = "flex";
})

const submitbtn = document.querySelector(".submitbtn");
submitbtn.addEventListener("click",()=>{
    const bookname = document.querySelector("#name").value.trim();
    const authorname = document.querySelector("#author").value.trim();
    const pages = document.querySelector("#pages").value.trim();
    const readstatus = document.querySelector("input[name='userbookread']:checked");
    const read = readstatus.id;


    const newBook = addBookToLibrary(bookname, authorname, read, pages);
    formdiv.style.display = "none";

    const article = document.createElement("div");
    article.classList.add("card");
    article.setAttribute("data-id", newBook.id);

    const ycheck = read == "yes"?"checked":"";
    const ncheck = read == "yes"?"":"checked";
    const yessid = `yess-${newBook.id}`;
    const nooid = `noo-${newBook.id}`;
    const radioname = `altered-${newBook.id}`;
    article.innerHTML = `
        <p class="BookName">${bookname}</p>
        <p class="AuthorName">${authorname}</p>
        <p class="NumberPages"> Pages: ${pages} </p>
        <div class="alterRead">
            <div class="alteryes">
                <input type="radio" id="${yessid}" name="${radioname}" ${ycheck} class="radio_toggle green">
                <label for="${yessid}">Read</label>
            </div>

            <div class="alterno">
                <input type="radio" id="${nooid}" name="${radioname}" ${ncheck} class="radio_toggle red">
                <label for="${nooid}">Not Read</label>
            </div>
        </div>
        <div class="delete">
            <button type="button" class="deletebtn">Remove</button>
        </div>
    `
    if(read == "yes"){
        article.style.border =  "4px solid greenyellow";
    }
    else{
        article.style.border = "4px solid orange";
    }


    main.appendChild(article);

    document.querySelector("#name").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";


})

main.addEventListener("click",(e)=>{
    if(e.target.classList.contains("deletebtn")){
        const closestCard = e.target.closest(".card");
        const cardid = closestCard.dataset.id;

        const Index = mylib.findIndex(b => cardid == b.id);
        mylib.splice(Index, 1);
        closestCard.remove();

    }
})

main.addEventListener("click",(e)=>{
    if(e.target.classList.contains("radio_toggle")){
        const btn = e.target;
        const class_card = e.target.closest(".card");
        const cardid = class_card.dataset.id;
        const toggle = btn.id;
        const index = mylib.findIndex(b=> b.id == cardid);
        if(toggle == `yess-${cardid}`){
            mylib[index].read = "yes";
            class_card.style.border = "4px solid greenyellow";
        }
        else{
            mylib[index].read = "no";
            class_card.style.border="4px solid orange";
        }
    }
})
