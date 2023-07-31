import type { DropDownInputOptionInterface } from "@/models";

export function getEnumTitle(enumValue: number | string, enumType: Object, enumTitlesInJson: any, language: string) {
    return enumTitlesInJson[enumType[enumValue]][language]
}

export function createEnumValues(enumType: Object, enumTitlesInJson: any, language: string) {
    return Object.keys(enumType).map(key => enumType[key]).filter(value => typeof value === 'string').map((key: string) => {
        return {
            title: getEnumTitle(enumType[key], enumType, enumTitlesInJson, language),
            payload: enumType[key]
        } as DropDownInputOptionInterface
    });
}