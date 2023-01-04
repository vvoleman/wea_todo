import StatusCode from "status-code-enum";
import ContentType from "@/base/enums/ContentType";
import AbstractResponse from "@/base/abstract/AbstractResponse";

class JsonResponse extends AbstractResponse {

    private readonly data: object

    constructor(data: object, statusCode: StatusCode = StatusCode.SuccessOK) {
        super();

        this.data = data;
        this.setStatusCode(statusCode);
    }

    getContent(): string {
        const jsonObject = this.prepareJsonObject()

        return JSON.stringify(jsonObject)
    }

    getContentType(): ContentType {
        return ContentType.JSON
    }

    private prepareJsonObject(): object {
        return {
            status: this.getStatusCode(),
            data: this.data
        }
    }

}

export default JsonResponse