# MCP Service

MCP Service is a gRPC-based microservice that provides Mode

## Features

- gRPC Server: Implements a gRPC server using @grpc/grpc-js.
- Health Check: Provides a HealthService with a Check endpoint to monitor the service's health.

---

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
   git clone <repository-url>
   cd mcp-service
```

2. Install dependencies:
```bash
   yarn install
```

3. Compile the TypeScript code:
```bash
   npx tsc
```

---

## Running the Service

1. Start the gRPC server:
   node dist/main.js

2. The server will start on the default port 50051. You can change the port by setting the GRPC_PORT environment variable:
   GRPC_PORT=50052 node dist/main.js

---

## Project Structure

```bash
    mcp-service/
    ├── src/
    │ ├── domain/
    │ │ └── interfaces/ # Interfaces for gRPC services
    │ ├── infrastructure/
    │ │ ├── grpc/ # gRPC server implementation
    │ │ ├── logger/ # Logging utilities
    │ │ └── interceptor/ # Interceptors for gRPC
    │ ├── proto/ # Proto files for gRPC services
    │ └── interfaces/handlers/ # gRPC service handlers
    ├── dist/ # Compiled JavaScript files
    ├── health-client.ts # gRPC client for testing
    ├── main.ts # Entry point for the service
    └── README.md # Project documentation
```
