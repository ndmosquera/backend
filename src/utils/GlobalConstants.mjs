// Products fields
export const TITLE = 'title'
export const DESCRIPTION = 'description'
export const CODE = 'code'
export const PRICE = 'price'
export const STOCK = 'stock'
export const CATEGORY = 'category'
export const THUMBNAIL = 'thumbnail'
export const ID = '_id'
export const OWNER = 'owner'

// Carts fields
export const PRODUCTS = 'products'
export const QUANTITY = "quantity"

// User fields
export const FIRST_NAME = "name"
export const LAST_NAME = "last_name"
export const USERNAME = "username"
export const EMAIL = "email"
export const AGE = "age"
export const PASSWORD = "password"
export const AVATAR = "avatar"
export const CART = "cart"
export const ROLE = 'role'
export const USER = 'user'
export const ADMIN = 'admin'
export const PREMIUM = "premium"

// Ticket fields
export const PURCHASE_DATETIME = "purchase_datetime"
export const AMOUNT = "amount"
export const PURCHASER = "purchaser"
export const PURCHASE = 'purchase'

// Token fields
export const TOKEN_TIME = 'token_time'

// Generic
export const COMPLETE = "complete"
export const INCOMPLETE = "incomplete"

// Persistence
export const PRODUCTS_PERSISTENCE = "products_persistence"
export const CARTS_PERSISTENCE = "carts_persistence"
export const USERS_PERSISTENCE = "users_persistence"
export const TICKETS_PERSISTENCE = "tickets_persistence"
export const TOKENS_PERSISTENCE = "tokens_persistence"

// DATABASE
export const DB_NAME = "ecommerce"
export const DATA = 'data'
export const STATUS = 'status'
export const OK = 'ok'
export const SOME_ERRORS = 'some_errors'
export const MSG = 'message'
export const ERROR = 'error'

// Models
export const CARTS = 'carts'
export const MESSAGES = 'messages'
export const USERS = 'users'
export const TICKET = 'ticket'
export const TOKEN = 'token'

// Errors enum
export const EErrors = {
    ROUTING_ERROR : 1,
    SERVICE_ERROR : 2,
    DATABASE_ERROR : 3,
    USER_INPUT_ERROR : 4,
    PRODUCT_ERROR: 5,
    AUTH_ERROR: 6
}