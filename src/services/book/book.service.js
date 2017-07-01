
// Client Side State of the store
// Kind of caching...
var books = [];

function getBooks() {
  return new Promise(resolve => {
    // simple caching mechanism
    if (books.length) {
      resolve(books);
    }
    else {
      setTimeout(() => {
        books = generateBooks();
        resolve(books);
      }, 500);
    }

  });
}

function getBookById(bookId) {
  return getBooks().then(books => {
    const book = books.find(book => bookId === book.id);
    return book;
  });
}

function deleteBook(book) {
  console.log('Deleting the book', book)
  var idx = books.indexOf(book)
  books.splice(idx, 1);
}

function getNext(book) {
    // select next in a cyclic way
    var idx = books.indexOf(book);
    return (idx < books.length-1)?  
          books[idx+1] : books[0];
}

function saveBook(book) {
  var idx = books.findIndex(currBook => currBook.id === book.id);
  //if this is a new book
  if (idx === -1) books.push(book);
  //if this is edit of existing book
  else books.splice(idx, 1, book);
}

// var bookService = {
//   getBooks,
//   deleteBook,
//   getNext,
//   saveBook
// }



// Used to create local data with no AJAX
function generateBooks() {
  books = [] 
  books.push(generateBook(1, 'The name of the rose', 
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, ea cumque natus quo aut, aspernatur sunt asperiores numquam! Ipsam id voluptates atque fuga inventore incidunt explicabo eius, maiores corporis iusto',
  'http://images.gr-assets.com/books/1415375471l/119073.jpg', 23))
  books.push(generateBook(2, 'The girl without a name', 
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, ea cumque natus quo aut, aspernatur sunt asperiores numquam! Ipsam id voluptates atque fuga inventore incidunt explicabo eius, maiores corporis iusto',
  'http://static2.hypable.com/wp-content/uploads/2015/09/the-girl-without-a-name-cover-e1442009010700.jpg', 65))
  books.push(generateBook(3, 'Book with no name', 
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, ea cumque natus quo aut, aspernatur sunt asperiores numquam! Ipsam id voluptates atque fuga inventore incidunt explicabo eius, maiores corporis iusto',
  'http://images.gr-assets.com/books/1328729548l/1039041.jpg', 10))
  books.push(generateBook(4, 'A little leg work', 
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, ea cumque natus quo aut, aspernatur sunt asperiores numquam! Ipsam id voluptates atque fuga inventore incidunt explicabo eius, maiores corporis iusto',
  'https://images.indiegogo.com/file_attachments/657706/files/20140618071944-SANY0001.JPG?1403101184', 98))
  books.push(generateBook(5, 'Not in gods name', 
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, ea cumque natus quo aut, aspernatur sunt asperiores numquam! Ipsam id voluptates atque fuga inventore incidunt explicabo eius, maiores corporis iusto',
  'https://www.prospectmagazine.co.uk/wp-content/uploads/2015/07/Not-In-Gods-Name.jpg', 64))
  books.push(generateBook(6, 'The emperors knife', 
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, ea cumque natus quo aut, aspernatur sunt asperiores numquam! Ipsam id voluptates atque fuga inventore incidunt explicabo eius, maiores corporis iusto',
  'http://3.bp.blogspot.com/-yP30JtyopwQ/T2d7yTYJVXI/AAAAAAAAAEQ/xXVyPb5Ui-I/s1600/TEKUK.jpg', 37))
  console.log(books)
  return books;
}

function generateBook(id, title, description, img, price) {
  return {
    id,
    title,
    description,
    img,
    price,
  }
}


export default {
  getBooks,
  getBookById,
  deleteBook,
  getNext,
  saveBook
}