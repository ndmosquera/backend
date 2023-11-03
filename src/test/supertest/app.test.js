import ENV from '../../config/env.js'
import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest(`http://localhost/${ENV.PORT}/api`)

describe(
    "Testeando los recursos de "
)
