import request, { gql } from 'graphql-request'
import { createContext, useEffect, useState } from 'react'

export const AuthUserContext = createContext(undefined) //null?
