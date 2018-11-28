'use strict';

import db from './db';
import { GraphQLSchema, GraphQLObjectType, GraphQLInt,
  GraphQLFloat, GraphQLList, GraphQLBoolean } from 'graphql';

export const options: {
  resultTable: string;
  maxRowsInResultTable: number;
} = {
  resultTable: '',
  maxRowsInResultTable: -1,
};

export const resultsType: GraphQLObjectType = new GraphQLObjectType({
  name: 'results',
  fields: {
    results: {
      type: new GraphQLList(GraphQLFloat),
      args: {
        row: {
          type: GraphQLInt,
        },
      },
      resolve: (root, args) => {
        if (args.row !== undefined) {
          return args.row === -1 ?
            [db.getLast(options.resultTable)] : [db.getByRowNumber(options.resultTable, args.row)];
        }
        return db.getAll(options.resultTable);
      },
    },
  },
});

export const addResult = (result: number): Promise<boolean> => {
  return db.countRows(options.resultTable).then((countedRows: number) => {
    if (options.maxRowsInResultTable < 0 || countedRows < options.maxRowsInResultTable) {
      return db.addLast(options.resultTable, result).then(() => {
        return true;
      });
    }
    return db.shift(options.resultTable).then(() => {
      return db.addLast(options.resultTable, result);
    }).then(() => {
      return true;
    });
  });
};

export const addNewResult = new GraphQLObjectType({
  name:'mutations',
  fields: () => ({
    addResult: {
      type: GraphQLBoolean,
      args: {
        value: {
          type: GraphQLFloat,
        },
      },
      resolve: (root, args) => {
        if (args.value === undefined) {
          return false;
        }
        return addResult(args.value);
      },
    },
  }),
});

export const schema = new GraphQLSchema({
  query: resultsType,
  mutation: addNewResult,
});
