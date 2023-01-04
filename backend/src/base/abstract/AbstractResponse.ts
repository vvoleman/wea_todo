import ContentType from "@/base/enums/ContentType"
import StatusCode from "status-code-enum"

abstract class AbstractResponse {
    private headers: Map<string, string> = new Map<string, string>();
    private statusCode: StatusCode = StatusCode.SuccessOK;

    public abstract getContentType(): ContentType

    public abstract getContent(): string;

    public getStatusCode(): StatusCode {
        return this.statusCode
    }

    public getHeaders(): Map<string, string> {
        return this.headers
    }

    public setStatusCode(statusCode: StatusCode): void {
        this.statusCode = statusCode
    }

    public addHeader(key: string, value: string): void {
        this.headers.set(key, value)
    }

}

export default AbstractResponse