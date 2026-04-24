declare module "@apiClient" {
    import type { AxiosInstance } from "axios";

    const apiClient: AxiosInstance;
    export default apiClient;
    export { apiClient };
}
