//============ INHERITENCE =====================
//==============================================
// remove previous content function
const removePrevious = idName => {
    const removediv = document.getElementById(idName);
    removediv.textContent = '';
}

// toggle spinner function
const toggleSpinner = displayResult => {
    document.getElementById('spinner').style.display = displayResult;
}
// previous contents display result during toggle spinner
const ContentDisplay = (divId, displayResult) => {
    document.getElementById(divId).style.visibility = displayResult;
}
//===================END=============================

// Data load of Book Archive---------------------------------
const bookArchiveLoadData = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    // clear search field
    searchField.value = '';

    // toggle spinner time
    toggleSpinner('block');
    ContentDisplay('books-container' , 'hidden');
    ContentDisplay('warning-msg' , 'hidden');
    ContentDisplay('empty-warning' , 'hidden');
    ContentDisplay('search-result' , 'hidden');

    // for empty search field
    if(searchFieldText === ''){
        const warningDiv = document.getElementById('empty-warning');
        // remove previous warning msg
        warningDiv.textContent = '';
        removePrevious('books-container');
        removePrevious('warning-msg');

        const p = document.createElement('p');
        p.classList.add('text-center', 'text-danger')
        p.innerText = 'Search field is empty. Please type something what do you looking for.';
        warningDiv.appendChild(p);

        // toggle spinner 
        toggleSpinner('none');
        ContentDisplay('empty-warning' , 'visible');
    }
    else{
        // fetch
        const url = `https://openlibrary.org/search.json?q=${searchFieldText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBookArchive(data))
    }

    
}

// Display book archive
const displayBookArchive = books => {

    const booksDiv = document.getElementById('books-container');

    // remove previous books
    booksDiv.textContent = '';
    removePrevious('empty-warning');

    // warning msg for wrong searching
    if(books.docs.length === 0){
        const warningDiv = document.getElementById('warning-msg');
        // remove previous warning msg
        warningDiv.textContent = '';

        const p = document.createElement('p');
        p.classList.add('text-center', 'text-danger');
        p.innerText = 'Something went wrong!!! Please try again.';
        warningDiv.appendChild(p);
        // window.alert('Not found');
        // toggle spinner
        toggleSpinner('none');
        // content display result
        ContentDisplay('books-container' , 'hidden');
        ContentDisplay('search-result' , 'hidden');
        ContentDisplay('warning-msg' , 'visible');
        
    }
    else{
        books.docs?.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Author: ${book.author_name?book.author_name: ''}</p>
                    <p class="card-text">First published: ${book.first_publish_year ? book.first_publish_year: ''}</p>
                </div>
            </div>
            `;
            booksDiv.appendChild(div);
        })
        // Search result div
        const searchResultDiv = document.getElementById('search-result');
        searchResultDiv.textContent = '';
        searchResultDiv.innerHTML = `
            <p>Total result found: ${books.numFound}</p>
        `;

        // toggle spinner hidden time
        toggleSpinner('none');
        ContentDisplay('books-container', 'visible');
        ContentDisplay('search-result', 'visible');
        // remove warning msg
        removePrevious('empty-warning');
    }

    
}