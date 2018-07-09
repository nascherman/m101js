class AuthorFactory {
    constructor(authors) {
        this.authors = authors || [
            'Jane Doe',
            'John Doe',
            'Mary Quincy',
            'Arthur Conan Doyle',
            'Homer',
            'Franz Kafka'
        ]
    }

    createAuthors() {
        return this.authors.map(author => {
            return new Author(author)
        });
    }
}

class BookFactory {
    constructor(titles) {
        this.titles = titles || [
            'Gone with the wind',
            'War and Peace',
            'The Lord of the Rings',
            '100 Years of Solitude',
            'The Illiad',
            'On the Origin of Species'
        ];
    }

    createBooks() {
        return this.titles.map(title => {
            return new Book(title);
        });
    }
}

class Book {
    constructor(title, authors) {
        this.title = title;
        this.authors = authors || [];
    }
}

class Author {
    constructor(name, books) {
        this.name = name;
        this.books = books || [];
    }
}

module.exports = {
    BookFactory,
    AuthorFactory
};