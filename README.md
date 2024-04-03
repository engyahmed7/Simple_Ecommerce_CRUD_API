# Simple Ecommerce API

This is a simple Express.js API for managing users, items, and orders.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/engyahmed7/Simple_Ecommerce_CRUD_API.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Simple_Ecommerce_CRUD_API
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=7000
   MONGODB_URI=<your-mongodb-uri>
   ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Users

- `GET /api/user`: Get all users.
- `GET /api/user/:id`: Get user by ID.
- `POST /api/user`: Create a new user.
- `POST /api/user/login`: Login user.
- `PUT /api/user/:id`: Update user.
- `DELETE /api/user/:id`: Delete user.

### Items

- `POST /api/item`: Create a new item.
- `GET /api/item`: Get all items.
- `GET /api/item/:id`: Get item by ID.
- `PUT /api/item/:id`: Update item.
- `DELETE /api/item/:id`: Delete item.

### Orders

- `POST /api/order/:id`: Create a new order with the specified item IDs.
- `GET /api/order`: Get all orders.
- `GET /api/order/:id`: Get order by ID.
- `PUT /api/order/:id`: Update order (e.g., add or remove items).
- `DELETE /api/order/:id`: Delete order.

## Item-Order Relationship

- An order consists of one or more items.
- When creating an order (`POST /api/order/:id`), provide the IDs of the items to be included in the order.
- Each item ID in the `itemIds` array corresponds to an item in the order.
- Use the `itemIds` array in the order schema to maintain the relationship between items and orders.


### Validation

Requests are validated using JSON schema validation. If a request does not conform to the expected schema, a 400 Bad Request response is returned with details of the validation error.

## Dependencies

- Express.js: Web framework for Node.js
- MongoDB: NoSQL database
- Mongoose: MongoDB object modeling for Node.js
- bcrypt: Password hashing library
- dotenv: Environment variable management


