/**
 * GrpcServer interface defining the contract for a gRPC server.
 * It includes methods for starting the server and handling shutdown.
 * This interface is implemented by the GrpcServer class.
 */
export interface IGrpcServer {
  /**
   * Starts the gRPC server.
   */
  start(): void;
}
