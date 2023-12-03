# crud-master

This documentation will help you understand the architecture, setup, and usage of the movie streaming platform built using microservices infrastructure.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [API Documentation](#api-documentation)
   - [API Gateway](#api-gateway)
   - [Inventory API](#inventory-api)
   - [Billing API](#billing-api)
4. [Virtual Machines](#virtual-machines)
5. [Project Organization](#project-organization)

## 1. Project Overview <a name="project-overview"></a>

The crud-master project implements a movie streaming platform with two microservices: `Inventory` and `Billing`. The API Gateway manages communication between these services, using HTTP for `Inventory` and RabbitMQ for `Billing`. The project is organized into virtual machines (VMs) to simulate a production environment.

## 2. Getting Started <a name="getting-started"></a>

### Prerequisites <a name="prerequisites"></a>

Make sure you have the following installed on your machine:

- Node.js 18.16
- PostgreSQL
- RabbitMQ
- Postman
- VirtualBox
- Vagrant

### Installation <a name="installation"></a>

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/crud-master.git
   ```

2. Navigate to the project directory:

   ```bash
   cd crud-master
   ```

3. Create a `.env` file in the project root and configure the necessary environment variables. You can use `.example.env` for testing.

4. Install dependencies for each service:

   ```bash
   cd srcs/api-gateway
   npm install

   cd ../inventory-app
   npm install

   cd ../billing-app
   npm install
   ```

5. Run the services locally:

   ```bash
   # In srcs/api-gateway
   npm start

   # In srcs/inventory-app
   npm start

   # In srcs/billing-app
   npm start
   ```

6. Use Postman to test the APIs. You may use Postman configuration located at `postman-config` folder.

## 3. API Documentation <a name="api-documentation"></a>

### API Gateway <a name="api-gateway"></a>

The API Gateway routes requests between the `Inventory` and `Billing` services. It uses a proxy system to forward requests to the appropriate service. API documentation is available in the OpenAPI format. Refer to [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for detailed API documentation.

### Inventory API <a name="inventory-api"></a>

The `Inventory` API is a CRUD RESTful API that provides information about movies. It uses a PostgreSQL database named `movies`. Endpoints include:

- `GET /api/movies`
- `GET /api/movies?title=[name]`
- `POST /api/movies`
- `DELETE /api/movies`
- `GET /api/movies/:id`
- `PUT /api/movies/:id`
- `DELETE /api/movies/:id`

Refer to [Postman Tests](/postman-config) for API testing.

### Billing API <a name="billing-api"></a>

The `Billing` API processes messages received through RabbitMQ. It parses JSON messages and creates entries in the `orders` database. Endpoints include:

- RabbitMQ Queue: `billing_queue`

## 4. Virtual Machines <a name="virtual-machines"></a>

The project uses VirtualBox and Vagrant to set up three VMs:

- `gateway-vm`: Contains the API Gateway.
- `inventory-vm`: Contains the `Inventory` API and the `movies` database.
- `billing-vm`: Contains the `Billing` API, `orders` database, and RabbitMQ.

### Environment Variables

Configure your environment variables in the `.env` file for centralized credential management.

### Configuration of VMs

Use the `Vagrantfile` to create and start the VMs. Execute the following commands from the project root:

```bash
vagrant up --provider virtualbox   # Starts all VMs
vagrant status                     # Shows VM status
vagrant ssh <vm-name>              # Access a VM via SSH
```

## 5. Project Organization <a name="project-organization"></a>

### Overall File Structure

```console
.
├── README.md
├── .env
├── srcs
│   ├── api-gateway
│   │   ├── ...
│   ├── billing-app
│   │   ├── ...
│   └── inventory-app
│       ├── ...
├── postman-config
|   ├── ...
└── Vagrantfile
```
