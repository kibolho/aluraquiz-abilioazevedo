import { ApolloServer } from 'apollo-server-micro'
import { GraphQLDate } from 'graphql-iso-date'
import {
  asNexusMethod,
  makeSchema,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from 'nexus'
import path from 'path'
import prisma from '../../../lib/prisma'

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
    t.list.field('quizes', {
      type: 'Quiz',
      resolve: (parent) =>
        prisma.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .quizes(),
    })
  },
})

const Quiz = objectType({
  name: 'Quiz',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('content')
    t.boolean('published')
    t.nullable.field('author', {
      type: 'User',
      resolve: (parent) =>
        prisma.quiz
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .author(),
    })
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('getQuiz', {
      type: 'Quiz',
      args: {
        quizId: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.quiz.findUnique({
          where: { id: Number(args.quizId) },
        })
      },
    })

    t.list.field('listQuizes', {
      type: 'Quiz',
      resolve: (_parent, _args) => {
        return prisma.quiz.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('drafts', {
      type: 'Quiz',
      resolve: (_parent, _args, ctx) => {
        return prisma.quiz.findMany({
          where: { published: false },
        })
      },
    })

    t.list.field('filterQuizes', {
      type: 'Quiz',
      args: {
        searchString: nullable(stringArg()),
      },
      resolve: (_, { searchString }, ctx) => {
        return prisma.quiz.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: (_, { name, email }, ctx) => {
        return prisma.user.create({
          data: {
            name,
            email,
          },
        })
      },
    })

    t.nullable.field('deleteQuiz', {
      type: 'Quiz',
      args: {
        quizId: stringArg(),
      },
      resolve: (_, { quizId }, ctx) => {
        return prisma.quiz.delete({
          where: { id: Number(quizId) },
        })
      },
    })

    t.field('createDraft', {
      type: 'Quiz',
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return prisma.quiz.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.field('createQuiz', {
      type: 'Quiz',
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return prisma.quiz.create({
          data: {
            title,
            content,
            published: true,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.nullable.field('publish', {
      type: 'Quiz',
      args: {
        quizId: stringArg(),
      },
      resolve: (_, { quizId }, ctx) => {
        return prisma.quiz.update({
          where: { id: Number(quizId) },
          data: { published: true },
        })
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Quiz, User, GQLDate],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/prisma/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/prisma/schema.graphql'),
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({ schema }).createHandler({
  path: '/api/prisma',
})
