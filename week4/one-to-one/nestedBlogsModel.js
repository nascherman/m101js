/**
 * Creates a series of blog entries with embedded comments and tags documents.
 * @param noEntries
 */
function createNestedBlogEntries(noEntries) {
    let blogs = [];

    for (let i = 0; i < noEntries; i++) {
        let author = getRandomAuthor();

        blogs.push({
            title: TITLES[Math.floor(Math.random() * (TITLES.length))],
            author: author.author,
            'author_email': author['author_email'],
            content: CONTENT,
            comments: createBlogComments(getRandomWholeNumber(1, 10)),
            tags: createBlogTags(getRandomWholeNumber(1, 5))
        })
    }

    return blogs;
}

function createBlogComments(noComments) {
    let comments = [];

    for (let i = 0; i < noComments; i++) {
        let author = getRandomAuthor();

        comments.push({
            body: CONTENT,
            author: author.author,
            'author_email': author['author_email'],
            order: i
        })
    }

    return comments;
}

function createBlogTags(noTags) {
    const tagNames = ['Sports', 'Recreation', 'Travel', 'Technology', 'Fun times'];
    let tags = [];
    for (let i = 0; i < noTags; i++) {
        tags.push(tagNames[getRandomWholeNumber(0, tagNames.length - 1)])
    }

    return tags.filter((item, pos) => {
        return tags.indexOf(item) === pos;
    });
}

function getRandomAuthor() {
    const authors = [{
        author: 'Nick Scherman',
        'author_email': 'n_scherman@hotmail.com',
    }, {
        author: 'Joe Shmoe',
        'author_email': 'j.shmoe@gmail.com'
    }, {
        author: 'Jane Shmoe',
        'author_email': 'ja.shmoe@gmail.com'
    }, {
        author: 'Ted Rose',
        'author_email': 't.rose@hotmail.com'
    }, {
        author: 'Mary Rose',
        'author_email': 'm.rose@hotmail.com'
    }, {
        author: 'Eric Andre',
        'author_email': 'e.andre@gmail.com'
    }];

    return authors[Math.floor(Math.random() * authors.length)]
}

function getRandomWholeNumber(min = 0, max = 0) {
    return Math.floor(Math.random() * (max - min) + min)
}

const CONTENT = 'Lorem Ipsum lorem ipsum, Lorem Ipsum lorem';
const TITLES = ['New Blog', 'Some new idea', 'Some new concept', 'Hello there', 'What?!']

module.exports = createNestedBlogEntries;
