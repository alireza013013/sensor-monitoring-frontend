export default function useValidators() {
    const lenghtValidation = (
        fieldName: string,
        fieldValue: string,
        min: number,
        max: number
    ): [string, boolean] => {
        if (
            fieldValue != null &&
            fieldValue != undefined &&
            fieldValue.length < max &&
            fieldValue.length >= min
        ) {
            return ["", true]
        } else {
            return [`${fieldName} باید بین ${min.toLocaleString("fa")} تا ${max.toLocaleString("fa")} کاراکتر باشد.`, false];
        }
    };

    const exactLenghtValidation = (
        fieldName: string,
        fieldValue: string,
        length: number,
    ): [string, boolean] => {
        if (
            fieldValue !== null &&
            fieldValue !== undefined &&
            fieldValue.length == length
        ) {
            return ["", true]
        } else {
            return [`${fieldName} باید ${length.toLocaleString("fa")} کاراکتر باشد.`, false];
        }
    };

    const numberAndExactLengthValidation = (fieldValue: string, min: number, title: string): [string, boolean] => {
        const regularExpression = new RegExp("^[0-9]{" + min + "}$");
        if (regularExpression.test(fieldValue) && fieldValue.length === min) {
            return ["", true];
        } else {
            return [title + " " + min.toLocaleString('fa') + " رقم است", false];
        }
    }

    const emailValidation = (fieldValue: string): [string, boolean] => {
        const regularExpression = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (regularExpression.test(fieldValue) && fieldValue.length != 0) {
            return ["", true];
        } else {
            return ["ایمیل باید شامل یک @ باشد", false];
        }
    };

    const shebaCodeValidation = (fieldValue: string): [string, boolean] => {
        const regularExpression = new RegExp(/^IR[0-9]{24}$/);
        if (regularExpression.test(fieldValue)) {
            return ["", true];
        } else {
            return ["شماره شبا ۲۶ رقم است و با IR شروع می شود", false];
        }
    };

    const isNumberValidation = (fieldValue: string, title: string): [string, boolean] => {
        const regularExpression = new RegExp(/^[0-9]+$/);
        if (regularExpression.test(fieldValue)) {
            return ["", true];
        } else {
            return [title + " نباید شامل حروف باشد", false];
        }
    };

    const passwordValidation = (fieldValue: string): [string, boolean] => {
        const regularExpression = new RegExp(
            /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#@$%&? "]).*$/
        );
        // const regularExpression = new RegExp(
        //     /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/
        // );
        if (regularExpression.test(fieldValue) && fieldValue.length != 0) {
            return ["", true];
        } else {
            return ["رمز شامل عدد، حروف کوچک و بزرگ و حداقل یک کاراکتر خاص می باشد", false];
        }
    };

    const minLenghtValidation = (
        fieldName: string,
        fieldValue: string,
        min: number,
    ): [string, boolean] => {
        if (
            fieldValue != null &&
            fieldValue != undefined &&
            fieldValue.length >= min
        ) {
            return ["", true]
        } else {
            return [`${fieldName} باید بیشتر از ${min.toLocaleString("fa")} کاراکتر باشد.`, false];
        }
    };

    const maxLenghtValidation = (
        fieldName: string,
        fieldValue: string,
        max: number,
    ): [string, boolean] => {
        if (
            fieldValue != null &&
            fieldValue != undefined &&
            fieldValue.length < max
        ) {
            return ["", true]
        } else {
            return [`${fieldName} باید کمتر از ${max.toLocaleString("fa")} کاراکتر باشد.`, false];
        }
    };

    return {
        lenghtValidation,
        emailValidation,
        passwordValidation,
        minLenghtValidation,
        maxLenghtValidation,
        exactLenghtValidation,
        shebaCodeValidation,
        numberAndExactLengthValidation,
        isNumberValidation
    };
}
