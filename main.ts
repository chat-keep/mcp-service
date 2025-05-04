import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { GrpcServer } from "./src/infrastructure/grpc/server";
import { logger } from "./src/infrastructure/logger/logger";

async function bootstrap() {
  try {
    logger.info("[Main] Starting MCP Service...");
    logger.info("[Main] Loading proto definitions...");
    const PROTO_PATH = path.resolve(__dirname, "./src/proto/health.proto");
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    const protoDescriptor = grpc.loadPackageDefinition(
      packageDefinition
    ) as any;

    logger.info("[Main] Starting gRPC server...");
    const grpcServer = new GrpcServer(protoDescriptor.mcp);
    grpcServer.start();
  } catch (error) {
    logger.error(`[Main] Failed to start MCP Service: ${error}`);
    process.exit(1);
  }
}

bootstrap();
