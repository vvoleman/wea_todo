import i18n from "@/plugins/i18n";

import {FieldArrayContext, FormContext} from "vee-validate";

const {t} = i18n.global;

export function required(value: any): boolean|string {
    if (value === null || value === undefined || value === "") {
        return t("form.rules.required");
    }
    return true;
}

export function min(value: any, params: string[]): boolean|string {
    let min = 0;
    if (params.length > 0) {
        min = parseInt(params[0]);
    }

    if(value.length >= min) {
        return true;
    }

    return t("form.rules.min", {min});
}

export function max(value: any, params: string[]): boolean|string {
    let max = 0;
    if (params.length > 0) {
        max = parseInt(params[0]);
    }

    if (value.length <= max) {
        return true;
    }

    return t("form.rules.max", {max});
}

export function email(value: any): boolean|string {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return true;
    }

    return t("form.rules.email");
}

export function confirmed(value: any, [target]: [string], ctx: any): boolean|string {
    if (value === ctx.form[target]) {
        return true;
    }
    return t("form.rules.confirmed");
}

