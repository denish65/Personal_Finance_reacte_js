import React, { useState, useEffect } from 'react';
// import Library from './components/Library';
import { fetchBooks, uploadBook, toggleVisibility, downloadBook } from './services/LibraryService';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    date: '',
    book: null,
  });

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks()
      .then((response) => {
        setBooks(response.data.Library);
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setForm({ ...form, book: e.target.files[0] });
  };

  // Submit book
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    uploadBook(formData)
      .then((response) => {
        setBooks([...books, response.data]);
        alert('Book uploaded successfully!');
      })
      .catch((error) => console.error('Error uploading book:', error));
  };

  // Toggle visibility
  const handleToggleVisibility = (id) => {
    toggleVisibility(id)
      .then((response) => {
        setBooks(
          books.map((book) =>
            book.id === id ? { ...book, is_hidden: !book.is_hidden } : book
          )
        );
      })
      .catch((error) => console.error('Error toggling visibility:', error));
  };

  // Download book
  const handleDownload = (id) => {
    downloadBook(id)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `book_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.error('Error downloading book:', error));
  };

  return (
    <div>
      <h1>Library</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
        />
        <input type="file" name="book" onChange={handleFileChange} />
        <button type="submit">Upload Book</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} ({book.is_hidden ? 'Hidden' : 'Visible'})
            <button onClick={() => handleDownload(book.id)}>Download</button>
            <button onClick={() => handleToggleVisibility(book.id)}>
              Toggle Visibility
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;
