const graphql = require('graphql');
const Book = require('../models/book')
const Author = require('../models/author')

const { GraphQLObjectType, GraphQLString, 
       GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        pages: { type: GraphQLInt },
        author : {
            type : AuthorType,
            resolve(parent,args){
                return Author.findbyId(parent.authorID);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id : { type: GraphQLID },
        name: {type: GraphQLString },
        age: {type: GraphQLInt},
        book : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorID:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id);
            }
        },
        books:{
            type:GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({});
            }
        },
        author: {
            type: AuthorType,
            args : { name: {type: GraphQLString}},
            resolve(parent,args){
                return Author.findById(args.id);
            }
        },
        authors: {
            type : GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({});
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createBook:{
            type: BookType,
            args: {
                name : {type: new GraphQLNonNull(GraphQLString)},
                pages: {type: new GraphQLNonNull(GraphQLInt)},
                authorID: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name : args.name,
                    pages : args.pages,
                    authorID : args.authorID
                })
                return book.save();
            }
        },
        createAuthor:{
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name : args.name,
                    age : args.age
                })
                return author.save();
            }
        },
        updateBook:{
            type: BookType,
            args:{
                id : {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                pages: {type: new GraphQLNonNull(GraphQLInt)},
                authorID:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Book.findByIdAndUpdate(args.id,args);
            }
        },
        deleteBook:{ 
            type: BookType,
            args:{
                id : {type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                return Book.findByIdAndRemove(args.id);
            }
        },
        updateAuthor:{
            type: AuthorType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                return Author.findByIdAndUpdate(args.id,args);
            }
        },
        deleteAuthor:{
            type: AuthorType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                return Author.findByIdAndRemove(args.id);
            }
        }
    }
})
 
const mapAuthor = (author, id) => author && ({ id, ...author });
const mapBook = (book, id) => book && ({id, ...book});

const root = {
  authors: () => Author.map(mapAuthor),
  author: ({ id }) => mapAuthor(Author[id], id),
  books : () => Book.map(mapBook),
  book : ({id}) => mapBook(Book[id], id),
};

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    rootValue:root
});