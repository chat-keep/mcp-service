import * as grpc from "@grpc/grpc-js";
import { registerServices } from "./service-registry";
import { logger } from "../logger/logger";
import { IGrpcServer } from "../../domain/interfaces/grpc-server.interface";

export class GrpcServer implements IGrpcServer {
  private server: grpc.Server;
  private protoDescriptor: any;

  constructor(protoDescriptor: any) {
    this.server = new grpc.Server();
    this.protoDescriptor = protoDescriptor;
  }

  public start(): void {
    const port = process.env.GRPC_PORT || "50051";

    this.registerServices();

    this.server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err: Error | null, boundPort: number) => {
        if (err) {
          logger.error(`[GrpcServer] Failed to bind server: ${err.message}`);
          process.exit(1);
        }
        logger.info(`[GrpcServer] Server is running on port ${boundPort}`);
      }
    );

    this.handleShutdown();
  }

  /**
   * Registers all gRPC services to the server.
   */
  private registerServices(): void {
    registerServices(this.server, this.protoDescriptor);
  }

  /**
   * Handles shutdown of the server.
   */
  private handleShutdown(): void {
    process.on("SIGINT", () => {
      logger.info("[GrpcServer] Caught interrupt signal, shutting down...");
      this.server.tryShutdown((err) => {
        if (err) {
          logger.error(`[GrpcServer] Error during shutdown: ${err.message}`);
        } else {
          logger.info("[GrpcServer] Server shut down successfully.");
        }
        process.exit(0);
      });
    });
  }
}
